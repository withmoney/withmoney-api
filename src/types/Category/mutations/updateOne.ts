import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, nonNull, arg } from 'nexus';
import { getUserId } from '../../../utils';

import {inputObjectType, enumType} from 'nexus';

export const CategoryWhereUniqueInput = inputObjectType({
  name: 'CategoryWhereUniqueInput',
  definition(t) {
    t.int('id');
  },
});

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

    if (category.deletedAt !== null) {
      throw new ForbiddenError('please restore this entity before');
    }

    const updated = await ctx.prisma.category.update({
      // @ts-ignore
      where,
      data,
    });
    return updated;
  },
});
