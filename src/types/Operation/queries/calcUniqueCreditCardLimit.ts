import { queryField, arg, nonNull, objectType, inputObjectType } from '@nexus/schema';
import { ForbiddenError, ApolloError } from 'apollo-server';
import { getUserId } from '../../../utils';

export const CreditCardLimit = objectType({
  name: 'CreditCardLimitResult',
  definition(t) {
    t.float('limit');
    t.float('limitFree');
    t.float('limitBlocked');
  },
});

export const CalcCreditCardWhereUniqueInput = inputObjectType({
  name: 'CalcCreditCardWhereUniqueInput',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const calcUniqueCreditCardLimitQuery = queryField('calcUniqueCreditCardLimit', {
  type: nonNull('CreditCardLimitResult'),
  args: {
    where: nonNull(arg({ type: 'CalcCreditCardWhereUniqueInput' })),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const { limit, userId: creditCardUserId } = await ctx.prisma.creditCard.findUnique({
      select: {
        limit: true,
        userId: true,
      },
      where,
    });

    if (creditCardUserId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    const results = await ctx.prisma.operation.findMany({
      select: {
        isPaid: true,
        value: true,
      },
      where: {
        creditCardId: where.id,
        deletedAt: null,
        isPaid: false,
        userId,
      },
    });

    const limitBlocked = results.reduce((acc, operation) => acc - operation.value, limit);

    return {
      limit,
      limitBlocked,
      limitFree: limit - limitBlocked,
    };
  },
});
