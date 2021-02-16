import { ForbiddenError, ApolloError } from 'apollo-server';
import { mutationField, nonNull, arg } from 'nexus';
import { getUserId } from '../../../utils';

import { USER_UPDATED } from '../../Subscription';

export const UserUpdateOneMutation = mutationField('updateOneUser', {
  type: nonNull('User'),
  args: {
    data: nonNull('UserUpdateInput'),
  },
  resolve: async (_parent, { data }, ctx) => {
    const { pubsub } = ctx;

    const userId = await getUserId(ctx);

    const updated = await ctx.prisma.user.update({
      where: { id: userId },
      data,
    });

    pubsub.publish(USER_UPDATED, updated);
    return updated;
  },
});
