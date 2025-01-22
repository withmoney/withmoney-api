import { ApolloError, ForbiddenError, ValidationError } from 'apollo-server';
import { mutationField, nonNull, arg, stringArg, floatArg } from 'nexus';
import { getUserId } from '../../../utils';

export const PaymentMethodUpdateOneMutation = mutationField('paymentMethodUpdateOne', {
  type: nonNull('PaymentMethodSingleResult'),
  args: {
    id: nonNull(stringArg()),
    input: nonNull(
      arg({
        type: 'PaymentMethodUpdateInput',
      }),
    ),
  },
  resolve: async (parent, { id, input: { accountId, name } }, ctx) => {
    const userId = await getUserId(ctx);

    const paymentMethod = await ctx.prisma.paymentMethod.findFirst({
      where: { id },
    });

    if (!paymentMethod) {
      throw new ApolloError('entity not found');
    }

    if (paymentMethod.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    if (!(await ctx.prisma.account.findUnique({ where: { id: accountId } }))) {
      throw new ValidationError('accountId not found');
    }

    const data = await ctx.prisma.paymentMethod.update({
      where: { id },
      data: {
        name,
        account: { connect: { id: accountId } },
        user: { connect: { id: userId } },
      },
    });

    return { data };
  },
});
