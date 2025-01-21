import { queryField, arg, nonNull, list, objectType } from 'nexus';
import { getUserId } from '../../../utils';

export const CalcPreviousBalanceQuery = queryField('calcPreviousBalance', {
  type: nonNull('CalcPreviousBalanceResult'),
  args: {
    where: nonNull(arg({ type: 'CalcPreviousBalanceWhereInput' })),
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
        deletedAt: null,
        userId,
      },
    });

    const amount = results.reduce((acc, operation) => {
      if (operation.type === 'Income') {
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
