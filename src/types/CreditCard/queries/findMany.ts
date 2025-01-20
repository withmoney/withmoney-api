import { queryField, arg, nonNull, list } from 'nexus';
import { getUserId } from '../../../utils';

import { inputObjectType } from 'nexus';

export const CreditCardWhereInput = inputObjectType({
  name: 'CreditCardWhereInput',
  definition(t) {
    t.field('name', { type: 'StringFilter' });
    t.string('number');
    t.string('expirationDate');
    t.string('cvv');
    t.field('accountId', { type: 'IdFilter' });
    t.field('deletedAt', { type: 'DateTimeFilter' });
  },
});

export const CreditCardOrderByInput = inputObjectType({
  name: 'CreditCardOrderByInput',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
    t.field('number', { type: 'SortOrder' });
    t.field('expirationDate', { type: 'SortOrder' });
    t.field('createdAt', { type: 'SortOrder' });
  },
});

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
