import { ValidationError } from 'apollo-server';
import { mutationField, nonNull, arg, stringArg, floatArg } from 'nexus';
import { getUserId } from '../../../utils';

export const OperationCreateOneMutation = mutationField('createOneOperation', {
  type: nonNull('Operation'),
  args: {
    data: nonNull(
      arg({
        type: 'OperationCreateInput',
      }),
    ),
  },
  resolve: async (
    parent,
    { data: { accountId, name, value, type, isPaid, paidAt, categoryId, creditCardId } },
    ctx,
  ) => {
    const userId = await getUserId(ctx);

    if (categoryId && !(await ctx.prisma.category.findUnique({ where: { id: categoryId } }))) {
      throw new ValidationError('categoryId not found');
    }

    if (!(await ctx.prisma.account.findUnique({ where: { id: accountId } }))) {
      throw new ValidationError('accountId not found');
    }

    if (
      creditCardId &&
      !(await ctx.prisma.creditCard.findUnique({ where: { id: creditCardId } }))
    ) {
      throw new ValidationError('creditCardId not found');
    }

    return ctx.prisma.operation.create({
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
        ...(!!creditCardId && {
          creditCard: { connect: { id: creditCardId } },
        }),
      },
    });
  },
});
