import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, arg, nonNull } from 'nexus';
import { getUserId } from '../../../utils';

import { inputObjectType } from 'nexus';

export const CreditCardWhereUniqueInput = inputObjectType({
  name: 'CreditCardWhereUniqueInput',
  definition(t) {
    t.nonNull.id('id');
  },
});

export const CreditCardDeleteOneMutation = mutationField('deleteOneCreditCard', {
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

    const operations = await ctx.prisma.operation.findMany({
      where: {
        creditCardId: creditCard.id,
      },
      select: {
        id: true,
      },
    });

    return ctx.prisma.creditCard.update({
      // @ts-ignore
      where,
      data: {
        deletedAt: new Date(),
        ...(!!operations.length && {
          operations: { disconnect: operations },
        }),
      },
    });
  },
});
