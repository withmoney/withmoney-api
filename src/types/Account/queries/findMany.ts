import { queryField, arg, nonNull, list } from '@nexus/schema';
import { getUserId } from '../../../utils';

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
