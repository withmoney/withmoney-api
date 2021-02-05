import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, nonNull, arg } from 'nexus';
import { getUserId } from '../../../utils';

export const CreditCardUpdateOneMutation = mutationField('updateOneCreditCard', {
  type: nonNull('CreditCard'),
  args: {
    where: nonNull(
      arg({
        type: 'CreditCardWhereUniqueInput',
      }),
    ),
    data: nonNull(
      arg({
        type: 'CreditCardUpdateInput',
      }),
    ),
  },
  resolve: async (parent, { where, data }, ctx) => {
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

    if (creditCard.deletedAt !== null) {
      throw new ForbiddenError('please restore this entity before');
    }

    const updated = await ctx.prisma.creditCard.update({
      where,
      data,
    });
    return updated;
  },
});
