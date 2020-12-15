import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CategoryDeleteOneMutation = mutationField('deleteOneCategory', {
  type: 'Category',
  args: {
    where: nonNull(
      arg({
        type: 'CategoryWhereUniqueInput',
      }),
    ),
  },
  resolve: async (_parent, { where }, ctx) => {
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

    const operations = await ctx.prisma.operation.findMany({
      where: {
        categoryId: category.id,
      },
      select: {
        id: true,
      },
    });

    return ctx.prisma.category.update({
      where,
      data: {
        deletedAt: new Date(),
        ...(!!operations.length && {
          operations: { disconnect: operations },
        }),
      },
    });
  },
});
