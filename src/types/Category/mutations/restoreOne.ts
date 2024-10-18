import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from 'nexus';
import { getUserId } from '../../../utils';

export const CategoryRestoreOneMutation = mutationField('restoreOneCategory', {
  type: 'Category',
  args: {
    where: nonNull(
      arg({
        type: 'CategoryWhereUniqueInput',
      }),
    ),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const category = await ctx.prisma.category.findFirst({
      // @ts-ignore
      where,
    });

    if (!category) {
      throw new ApolloError('entity not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return ctx.prisma.category.update({
      // @ts-ignore
      where,
      data: {
        deletedAt: null,
      },
    });
  },
});
