import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from 'nexus';
import { getUserId } from '../../../utils';

import { inputObjectType } from 'nexus';

export const AccountWhereUniqueInput = inputObjectType({
  name: 'AccountWhereUniqueInput',
  definition(t) {
    t.nonNull.int('id');
  },
});

export const AccountDeleteOneMutation = mutationField('deleteOneAccount', {
  type: 'Account',
  args: {
    where: nonNull(
      arg({
        type: 'AccountWhereUniqueInput',
      }),
    ),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const account = await ctx.prisma.account.findFirst({
      //@ts-ignore
      where,
    });

    if (!account) {
      throw new ApolloError('entity not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return ctx.prisma.account.update({
      // @ts-ignore
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  },
});
