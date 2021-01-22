import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from 'nexus';
import { getUserId } from '../../../utils';

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
      where,
    });

    if (!account) {
      throw new ApolloError('entity not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return ctx.prisma.account.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  },
});
