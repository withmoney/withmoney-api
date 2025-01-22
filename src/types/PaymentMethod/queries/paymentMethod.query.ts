import { queryField, arg } from 'nexus';
import { ForbiddenError } from 'apollo-server';
import { getUserId } from '../../../utils';

export const PaymentMethodQuery = queryField('paymentMethod', {
  type: 'PaymentMethodSingleResult',
  args: {
    where: arg({
      type: 'PaymentMethodWhereUniqueInput',
    }),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const data = await ctx.prisma.paymentMethod.findUnique({
      where,
    });

    if (data.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return { data };
  },
});
