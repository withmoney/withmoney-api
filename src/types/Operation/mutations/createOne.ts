import { mutationField, nonNull, arg, stringArg, floatArg } from '@nexus/schema';
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
  resolve: async (parent, { data: { accountId, name, value, type, isPaid, categoryId } }, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.operation.create({
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
