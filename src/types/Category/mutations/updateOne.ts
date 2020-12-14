import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, nonNull, arg } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CategoryUpdateOneMutation = mutationField('updateOneCategory', {
  type: nonNull('Category'),
  args: {
    where: nonNull(
      arg({
        type: 'CategoryWhereUniqueInput',
      }),
    ),
    data: nonNull(
      arg({
        type: 'CategoryUpdateInput',
      }),
    ),
  },
  resolve: async (parent, { where, data }, ctx) => {
    const userId = getUserId(ctx);

    const category = await ctx.prisma.category.findFirst({
      where,
    });

    if (!category) {
      throw new ApolloError('entity not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    const updated = await ctx.prisma.category.update({
      where,
      data,
    });
    return updated;
  },
});
