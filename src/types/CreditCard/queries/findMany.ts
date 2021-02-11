import { queryField, arg, nonNull, list } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CreditCardFindManyQuery = queryField('findManyCreditCard', {
  type: nonNull('CreditCardsResult'),
  args: {
    where: 'CreditCardWhereInput',
    orderBy: list(arg({ type: 'CreditCardOrderByInput' })),
    cursor: 'CreditCardWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    const data = await ctx.prisma.creditCard.findMany({
      ...args,
      where: {
        ...args.where,
        userId,
      },
    });

    const pagination = {
      totalItems: await ctx.prisma.creditCard.count({
        where: {
          ...args.where,
          userId,
        },
      }),
    };

    return { data, pagination };
  },
});
