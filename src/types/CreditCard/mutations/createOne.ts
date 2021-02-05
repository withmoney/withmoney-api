import { mutationField, nonNull, arg } from 'nexus';
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
  resolve: async (parent, { data }, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.creditCard.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  },
});
