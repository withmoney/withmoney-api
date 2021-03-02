import { queryField, arg, nonNull, list } from '@nexus/schema';
import { NexusGenInputs } from '../../../generated/nexus';
import { getUserId } from '../../../utils';

export const CategoryFindManyQuery = queryField('findManyCategory', {
  type: nonNull('CategoriesResult'),
  args: {
    where: 'CategoryWhereInput',
    orderBy: list(arg({ type: 'CategoryOrderByInput' })),
    cursor: 'CategoryWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    let where: NexusGenInputs['OperationWhereInput'] | null = {};

    if (args.where.name.contains) {
      where = {
        ...args.where,
        name: {
          contains: args.where.name.contains,
          mode: 'insensitive',
        },
      };
    }

    const data = await ctx.prisma.category.findMany({
      ...args,
      where: {
        ...where,
        userId,
      },
    });

    const pagination = {
      totalItems: await ctx.prisma.category.count({
        where: {
          ...where,
          userId,
        },
      }),
    };

    return { data, pagination };
  },
});
