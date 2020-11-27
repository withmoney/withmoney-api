import { intArg, queryType, stringArg } from '@nexus/schema';

import { Context } from '../../context';
import { getUserId } from '../../utils';

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);

        return ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      },
    });

    // t.list.field('feed', {
    //   type: 'Post',
    //   resolve: (parent, args, ctx) => {
    //     return ctx.prisma.post.findMany({
    //       where: { published: true },
    //     });
    //   },
    // });

    // t.list.field('filterPosts', {
    //   type: 'Post',
    //   args: {
    //     searchString: stringArg({ nullable: true }),
    //   },
    //   resolve: (parent, { searchString }, ctx) => {
    //     return ctx.prisma.post.findMany({
    //       where: {
    //         OR: [
    //           {
    //             title: {
    //               contains: searchString,
    //             },
    //           },
    //           {
    //             content: {
    //               contains: searchString,
    //             },
    //           },
    //         ],
    //       },
    //     });
    //   },
    // });

    // t.field('post', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: intArg() },
    //   resolve: (parent, { id }, ctx) => {
    //     return ctx.prisma.post.findOne({
    //       where: {
    //         id: Number(id),
    //       },
    //     });
    //   },
    // });
    t.list.field('categories', {
      type: 'Category',
      nullable: true,
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

    t.list.field('transactions', {
      type: 'Transaction',
      nullable: true,
      // args: { id: intArg() },
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);

        return ctx.prisma.transaction.findMany({
          where: {
            userId,
          },
        });
      },
    });
  },
});
