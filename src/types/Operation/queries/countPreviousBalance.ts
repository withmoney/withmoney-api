import { queryField, arg, nonNull, list, objectType } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CountPreviousBalanceResult = objectType({
  name: 'CountPreviousBalanceResult',
  definition(t) {
    t.float('amount');
  },
});

export const CountPreviousBalanceQuery = queryField('countPreviousBalance', {
  type: nonNull('CountPreviousBalanceResult'),
  args: {
    where: nonNull(arg({ type: 'CountPreviousBalanceWhereInput' })),
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    const results = await ctx.prisma.operation.findMany({
      select: {
        type: true,
        value: true,
      },
      where: {
        ...args.where,
        isPaid: true,
        userId,
      },
    });

    const amount = results.reduce((acc, operation) => {
      if (operation.type === 'Deposit') {
        return acc + operation.value;
      } else {
        return acc - operation.value;
      }
    }, 0);

    return {
      amount,
    };
  },
});
