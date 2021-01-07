import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, nonNull, arg, stringArg, floatArg } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const OperationUpdateOneMutation = mutationField('updateOneOperation', {
  type: nonNull('Operation'),
  args: {
    where: nonNull(
      arg({
        type: 'OperationWhereUniqueInput',
      }),
    ),
    data: nonNull(
      arg({
        type: 'OperationUpdateInput',
      }),
    ),
  },
  resolve: async (
    parent,
    { data: { accountId, name, value, type, isPaid, categoryId }, where },
    ctx,
  ) => {
    const userId = getUserId(ctx);

    const operation = await ctx.prisma.operation.findFirst({
      where,
    });

    if (!operation) {
      throw new ApolloError('entity not found');
    }

    if (operation.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    if (operation.deletedAt !== null) {
      throw new ForbiddenError('please restore this entity before');
    }

    return ctx.prisma.operation.update({
      where,
      data: {
        name,
        value,
        type,
        isPaid,
        account: { connect: { id: accountId } },
        user: { connect: { id: userId } },
        ...(!!categoryId && {
          category: { connect: { id: categoryId } },
        }),
      },
    });
  },
});
