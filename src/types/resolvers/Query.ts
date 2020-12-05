import { intArg, queryType, stringArg } from '@nexus/schema';

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

    // t.crud.categories({
    //   filtering: true,
    // });
    t.list.field('categories', {
      type: 'Category',
      args: { name: stringArg() },
      resolve: (parent, { name }, ctx: Context) => {
        const userId = getUserId(ctx);

        return ctx.prisma.category.findMany({
          where: {
            userId,
            ...(!!name && {
              name: {
                contains: name,
              },
            }),
          },
        });
      },
    });

    t.list.field('operations', {
      type: 'Operation',
      resolve: (parent, args, ctx: Context) => {
        const userId = getUserId(ctx);

        return ctx.prisma.operation.findMany({
          where: {
            userId,
          },
        });
      },
    });
  },
});
