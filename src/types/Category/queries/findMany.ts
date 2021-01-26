import { queryField, arg, nonNull, list } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CategoryFindManyQuery = queryField('findManyCategory', {
  type: nonNull(list(nonNull('Category'))),
  args: {
    where: 'CategoryWhereInput',
    orderBy: list(arg({ type: 'CategoryOrderByInput' })),
    cursor: 'CategoryWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.category.findMany({
      ...args,
      where: {
        ...args.where,
        userId,
      },
    });
  },
});
