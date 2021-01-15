import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, nonNull, arg } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const AccountUpdateOneMutation = mutationField('updateOneAccount', {
  type: nonNull('Account'),
  args: {
    where: nonNull(
      arg({
        type: 'AccountWhereUniqueInput',
      }),
    ),
    data: nonNull(
      arg({
        type: 'AccountUpdateInput',
      }),
    ),
  },
  resolve: async (parent, { where, data }, ctx) => {
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

    if (account.deletedAt !== null) {
      throw new ForbiddenError('please restore this entity before');
    }

    const updated = await ctx.prisma.account.update({
      where,
      data,
    });
    return updated;
  },
});
