import { queryField, arg, nonNull, list, objectType } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CalcCreditCardsLimitResults = objectType({
  name: 'CalcCreditCardsLimitResults',
  definition(t) {
    t.float('limit');
    t.float('limitFree');
    t.float('limitBlocked');
    t.field('creditCard', { type: 'CreditCard' });
  },
});

export const calcManyCreditCardLimitQuery = queryField('calcManyCreditCardLimit', {
  type: nonNull(list(nonNull('CalcCreditCardsLimitResults'))),
  args: {
    where: nonNull(arg({ type: 'CalcCreditCardsLimitWhereInput' })),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const results = [];

    const creditCards = await ctx.prisma.creditCard.findMany({
      where: {
        ...where,
        userId,
        deletedAt: null,
      },
    });

    for (let creditCard of creditCards) {
      const operations = await ctx.prisma.operation.findMany({
        select: {
          isPaid: true,
          value: true,
        },
        where: {
          ...where,
          creditCardId: creditCard.id,
          deletedAt: null,
          userId,
          isPaid: false,
        },
      });

      const limitBlocked = operations.reduce(
        (acc, operation) => acc - operation.value,
        creditCard.limit,
      );

      results.push({
        limit: creditCard.limit,
        limitFree: creditCard.limit - limitBlocked,
        limitBlocked,
        creditCard,
      });
    }

    return results;
  },
});
