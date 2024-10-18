import { queryField, arg } from 'nexus';
import { ForbiddenError } from 'apollo-server';
import { getUserId } from '../../../utils';

export const AccountFindUniqueQuery = queryField('findUniqueAccount', {
  type: 'Account',
  args: {
    where: arg({
      type: 'AccountWhereUniqueInput',
    }),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const entity = await ctx.prisma.account.findUnique({
      // @ts-ignore
      where,
    });

    if (entity.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return entity;
  },
});
