import { queryField, arg, nonNull, list } from 'nexus';
import { getUserId } from '../../../utils';

import { inputObjectType, enumType } from 'nexus';


export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
});


export const AccountWhereInput = inputObjectType({
  name: 'AccountWhereInput',
  definition(t) {
    t.string('name');
    t.field('currency', { type: 'Currency' });
  },
});

export const AccountOrderByInput = inputObjectType({
  name: 'AccountOrderByInput',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
    t.field('currency', { type: 'SortOrder' });
  },
});

export const AccountFindManyQuery = queryField('findManyAccount', {
  type: nonNull(list(nonNull('Account'))),
  args: {
    where: 'AccountWhereInput',
    orderBy: list(arg({ type: 'AccountOrderByInput' })),
    cursor: 'AccountWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.account.findMany({
      ...args,
      where: {
        ...args.where,
        userId,
      },
    });
  },
});
