import { mutationField, nonNull, arg } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const CategoryCreateOneMutation = mutationField('createOneCategory', {
  type: nonNull('Category'),
  args: {
    data: nonNull(
      arg({
        type: 'CategoryCreateInput',
      }),
    ),
  },
  resolve: (parent, { data }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.category.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  },
});
