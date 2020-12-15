import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const OperationRestoreOneMutation = mutationField('restoreOneOperation', {
  type: 'Operation',
  args: {
    where: nonNull(
      arg({
        type: 'OperationWhereUniqueInput',
      }),
    ),
  },
  resolve: async (_parent, { where }, ctx) => {
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
    console.log('oi');
    return ctx.prisma.operation.update({
      where,
      data: {
        deletedAt: null,
      },
    });
  },
});
