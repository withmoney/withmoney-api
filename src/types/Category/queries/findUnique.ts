import { queryField, arg } from 'nexus';
import { ForbiddenError } from 'apollo-server';
import { getUserId } from '../../../utils';

export const CategoryFindUniqueQuery = queryField('findUniqueCategory', {
  type: 'Category',
  args: {
    where: arg({
      type: 'CategoryWhereUniqueInput',
    }),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const entity = await ctx.prisma.category.findUnique({
      where,
    });

    if (entity.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return entity;
  },
});
