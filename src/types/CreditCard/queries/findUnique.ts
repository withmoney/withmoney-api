import { queryField, arg } from 'nexus';
import { ForbiddenError } from 'apollo-server';
import { getUserId } from '../../../utils';

export const CreditCardFindUniqueQuery = queryField('findUniqueCreditCard', {
  type: 'CreditCard',
  args: {
    where: arg({
      type: 'CreditCardWhereUniqueInput',
    }),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const entity = await ctx.prisma.creditCard.findUnique({
      where,
    });

    if (entity.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return entity;
  },
});
