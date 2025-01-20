import { queryField, arg, nonNull, list } from 'nexus';
import { getUserId } from '../../../utils';

import { inputObjectType, enumType } from 'nexus';

export const CategoryTypeFilter = inputObjectType({
  name: 'TransactionTypeFilter',
  definition(t) {
    t.field('equals', { type: 'TransactionType' });
    t.field('in', { type: list('TransactionType') });
    t.field('notIn', { type: list('TransactionType') });
    t.field('not', { type: 'TransactionType' });
  },
});

export const FilterString = inputObjectType({
  name: 'FilterString',
  definition(t) {
    t.string('contains');
  },
});

export const CategoryWhereInput = inputObjectType({
  name: 'CategoryWhereInput',
  definition(t) {
    t.field('name', { type: 'StringFilter' });
    t.field('type', { type: 'TransactionTypeFilter' });
    t.field('deletedAt', { type: 'DateTimeFilter' });
  },
});

export const CategoryOrderByInput = inputObjectType({
  name: 'CategoryOrderByInput',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
  },
});

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

    // let where: NexusGenInputs['OperationWhereInput'] | null = {};
    let where = {};
    if (args?.where?.name?.contains) {
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
        ...args.where,
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
