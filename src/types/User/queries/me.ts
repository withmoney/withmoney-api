import { queryField, arg, nonNull } from '@nexus/schema';

import { getUserId } from '../../../utils';

export const meQuery = queryField('me', {
  type: 'User',
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
});
