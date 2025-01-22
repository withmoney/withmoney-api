import { queryField, arg, nonNull, list } from 'nexus';
import { getUserId } from '../../../utils';

export const PaymentMethodsQuery = queryField('paymentMethods', {
  type: 'PaymentMethodListResult',
  args: {
    where: 'PaymentMethodWhereInput',
    orderBy: list(arg({ type: 'PaymentMethodOrderByInput' })),
    cursor: 'PaymentMethodWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    let where = {};
    if (args?.where?.name) {
      where = {
        ...args.where,
        name: {
          ...args?.where?.name,
          mode: 'insensitive',
        },
      };
    }

    const [data, totalItems] = await ctx.prisma.$transaction([
      ctx.prisma.paymentMethod.findMany({
        ...args,
        where: {
          ...args.where,
          ...where,
          userId,
        },
      }),
      ctx.prisma.paymentMethod.count({
        where: {
          ...args.where,
          userId,
        },
      }),
    ]);

    return {
      data,
      pagination: {
        totalItems,
      },
    };
  },
});
