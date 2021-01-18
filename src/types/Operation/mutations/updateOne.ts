import { ForbiddenError, ApolloError, ValidationError } from 'apollo-server';
import { mutationField, nonNull, arg, stringArg, floatArg } from 'nexus';
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
    { data: { accountId, name, value, type, isPaid, paidAt, categoryId }, where },
    ctx,
  ) => {
    const userId = await getUserId(ctx);

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

    if (categoryId && !(await ctx.prisma.category.findUnique({ where: { id: categoryId } }))) {
      throw new ValidationError('categoryId not found');
    }

    if (!(await ctx.prisma.account.findUnique({ where: { id: accountId } }))) {
      throw new ValidationError('accountId not found');
    }

    return ctx.prisma.operation.update({
      where,
      data: {
        name,
        value,
        type,
        isPaid,
        paidAt,
        account: { connect: { id: accountId } },
        user: { connect: { id: userId } },
        ...(!!categoryId && {
          category: { connect: { id: categoryId } },
        }),
      },
    });
  },
});
