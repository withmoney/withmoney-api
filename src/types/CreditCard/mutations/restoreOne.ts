import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from 'nexus';
import { getUserId } from '../../../utils';

export const CreditCardRestoreOneMutation = mutationField('restoreOneCreditCard', {
  type: 'CreditCard',
  args: {
    where: nonNull(
      arg({
        type: 'CreditCardWhereUniqueInput',
      }),
    ),
  },
  resolve: async (_parent, { where }, ctx) => {
    const userId = await getUserId(ctx);

    const creditCard = await ctx.prisma.creditCard.findFirst({
      where,
    });

    if (!creditCard) {
      throw new ApolloError('entity not found');
    }

    if (creditCard.userId !== userId) {
      throw new ForbiddenError('action no allowed');
    }

    return ctx.prisma.creditCard.update({
      where,
      data: {
        deletedAt: null,
      },
    });
  },
});
