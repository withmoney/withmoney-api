import { mutationField, nonNull, arg } from 'nexus';
import { ValidationError } from 'apollo-server';
import { getUserId } from '../../../utils';

export const CreditCardCreateOneMutation = mutationField('createOneCreditCard', {
  type: nonNull('CreditCard'),
  args: {
    data: nonNull(
      arg({
        type: 'CreditCardCreateInput',
      }),
    ),
  },
  resolve: async (parent, { data: { accountId, ...data } }, ctx) => {
    const userId = await getUserId(ctx);

    if (!(await ctx.prisma.account.findUnique({ where: { id: accountId } }))) {
      throw new ValidationError('accountId not found');
    }

    return ctx.prisma.creditCard.create({
      data: {
        ...data,
        account: { connect: { id: accountId } },
        user: { connect: { id: userId } },
      },
    });
  },
});
