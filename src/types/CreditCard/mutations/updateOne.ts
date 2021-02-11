import { ForbiddenError, ApolloError, ValidationError } from 'apollo-server';
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
  resolve: async (parent, { where, data: { accountId, ...data } }, ctx) => {
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

    if (!(await ctx.prisma.account.findUnique({ where: { id: accountId } }))) {
      throw new ValidationError('accountId not found');
    }

    const updated = await ctx.prisma.creditCard.update({
      where,
      data: {
        ...data,
        account: { connect: { id: accountId } },
      },
    });
    return updated;
  },
});
