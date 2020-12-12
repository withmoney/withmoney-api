import { queryType, stringArg, nonNull } from '@nexus/schema';

import { Context } from '../../context';
import { getUserId } from '../../utils';

export const Query = queryType({
  definition(t) {
    t.field('me', {
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

    t.field('account', {
      type: 'Account',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (parent, { id }, ctx: Context) => {
        const userId = getUserId(ctx);

        return ctx.prisma.account.findFirst({
          where: {
            userId,
            id,
          },
        });
      },
    });
  },
});
