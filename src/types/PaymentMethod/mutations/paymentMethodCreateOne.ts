import { ValidationError } from 'apollo-server';
import { mutationField, nonNull, arg, stringArg, floatArg } from 'nexus';
import { getUserId } from '../../../utils';

export const PaymentMethodCreateOneMutation = mutationField('paymentMethodCreateOne', {
  type: nonNull('PaymentMethodSingleResult'),
  args: {
    input: nonNull(
      arg({
        type: 'PaymentMethodCreateInput',
      }),
    ),
  },
  resolve: async (parent, { input: { accountId, name } }, ctx) => {
    const userId = await getUserId(ctx);

    if (!(await ctx.prisma.account.findUnique({ where: { id: accountId } }))) {
      throw new ValidationError('accountId not found');
    }

    const data = await ctx.prisma.paymentMethod.create({
      data: {
        name,
        account: { connect: { id: accountId } },
        user: { connect: { id: userId } },
      },
    });

    return { data };
  },
});
