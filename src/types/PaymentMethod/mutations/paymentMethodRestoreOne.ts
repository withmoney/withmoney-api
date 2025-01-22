import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from 'nexus';
import { getUserId } from '../../../utils';

export const paymentMethodRestoreOneMutation = mutationField('paymentMethodRestoreOne', {
  type: 'PaymentMethodSingleResult',
  args: {
    where: nonNull(
      arg({
        type: 'PaymentMethodWhereUniqueInput',
      }),
    ),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const paymentMethod = await ctx.prisma.paymentMethod.findFirst({
      where,
    });

    if (!paymentMethod) {
      throw new ApolloError('entity not found');
    }

    if (paymentMethod.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    const data = await ctx.prisma.paymentMethod.update({
      where,
      data: {
        deletedAt: null,
      },
    });

    return { data };
  },
});
