import { queryField, arg, nonNull } from 'nexus';

import { getUserId } from '../../../utils';

export const meQuery = queryField('me', {
  type: 'User',
  resolve: async (parent, args, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
});
