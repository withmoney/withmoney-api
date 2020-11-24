import { APP_SECRET, getUserId } from '../../utils';
import { USER_SIGNED_IN, USER_UPDATED } from '../../types/resolvers/Subscription';
import { compare, hash } from 'bcryptjs';
import { inputObjectType, intArg, mutationType, stringArg, arg, floatArg } from '@nexus/schema';
import { v4 as uuidv4 } from 'uuid';
import { sendVerifyEmail, sendWelcomeMessage, sendChangePasswordRequest } from './../../email';

import { sign } from 'jsonwebtoken';

import { Context } from '../../context';

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.string('email', {
      required: true,
    });
    t.string('password', {
      required: true,
    });
    t.string('firstName', {
      required: true,
    });
    t.string('lastName', {
      required: true,
    });
    t.date('birthday');
    t.string('statusMessage');
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('email');
    t.string('name');
    t.string('nickname');
    t.date('birthday');
    t.string('phone');
    t.string('statusMessage');
    // t.gender('gender');
  },
});

export const Mutation = mutationType({
  definition(t) {
    t.field('register', {
      type: 'String',
      args: {
        user: arg({ type: UserInputType, nullable: false }),
      },
      resolve: async (_parent, { user }, ctx) => {
        const { firstName, lastName, email, password } = user;
        const hashedPassword = await hash(password, 10);
        const hashToVerifyEmail = uuidv4();

        const created = await ctx.prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            hasVerifiedEmail: false,
            hashToVerifyEmail,
          },
        });

        await sendVerifyEmail({
          firstName,
          email,
          hash: hashToVerifyEmail,
        });

        return 'OK';
      },
    });

    t.field('checkHashEmail', {
      type: 'String',
      args: {
        hash: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { hash }, ctx: Context) => {
        const searchUser = await ctx.prisma.user.findOne({ where: { hashToVerifyEmail: hash } });

        if (!searchUser) {
          throw new Error('Invalid Hash');
        }

        await ctx.prisma.user.update({
          where: {
            id: searchUser.id,
          },
          data: { hasVerifiedEmail: true, hashToVerifyEmail: null },
        });

        await sendWelcomeMessage({
          firstName: searchUser.firstName,
          email: searchUser.email,
        });

        return 'OK';
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const { pubsub } = ctx;

        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`Email not found`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        pubsub.publish(USER_SIGNED_IN, user);
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('requestChangePassword', {
      type: 'String',
      args: {
        email: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email }, ctx: Context) => {
        const searchUser = await ctx.prisma.user.findOne({ where: { email } });

        if (!searchUser) {
          throw new Error('Email not found');
        }

        const hashToChangePassword = uuidv4();

        await ctx.prisma.user.update({
          where: {
            id: searchUser.id,
          },
          data: { hashToChangePassword },
        });

        await sendChangePasswordRequest({
          firstName: searchUser.firstName,
          email: searchUser.email,
          hash: hashToChangePassword,
        });

        return 'OK';
      },
    });

    t.field('changePassword', {
      type: 'String',
      args: {
        hash: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { hash: hashToChangePassword, password }, ctx: Context) => {
        const searchUser = await ctx.prisma.user.findOne({ where: { hashToChangePassword } });

        if (!searchUser) {
          throw new Error('Invalid Hash');
        }

        const hashedPassword = await hash(password, 10);

        await ctx.prisma.user.update({
          where: {
            id: searchUser.id,
          },
          data: { password: hashedPassword, hashToChangePassword: null },
        });

        return 'OK';
      },
    });

    t.field('updateProfile', {
      type: 'User',
      args: {
        user: 'UserUpdateInput',
      },
      resolve: async (_parent, { user }, ctx) => {
        const { pubsub } = ctx;

        const userId = getUserId(ctx);

        const updated = await ctx.prisma.user.update({
          where: { id: userId },
          data: user,
        });

        pubsub.publish(USER_UPDATED, updated);
        return updated;
      },
    });

    // t.field('createDraft', {
    //   type: 'Post',
    //   args: {
    //     title: stringArg({ nullable: false }),
    //     content: stringArg(),
    //   },
    //   resolve: (parent, { title, content }, ctx: Context) => {
    //     const userId = getUserId(ctx);

    //     return ctx.prisma.post.create({
    //       data: {
    //         title,
    //         content,
    //         published: false,
    //         user: { connect: { id: userId } },
    //       },
    //     });
    //   },
    // });

    // t.field('deletePost', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: intArg({ nullable: false }) },
    //   resolve: (parent, { id }, ctx) => {
    //     return ctx.prisma.post.delete({
    //       where: {
    //         id,
    //       },
    //     });
    //   },
    // });

    // t.field('publish', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: intArg({ nullable: false }) },
    //   resolve: (parent, { id }, ctx: Context) => {
    //     return ctx.prisma.post.update({
    //       where: { id },
    //       data: { published: true },
    //     });
    //   },
    // });

    t.field('createAccount', {
      type: 'Account',
      args: {
        name: stringArg({ nullable: false }),
        // type: stringArg({ nullable: false }),
        // type: arg({ type: 'TransactionType', nullable: false }),
      },
      resolve: (parent, { name }, ctx: Context) => {
        const userId = getUserId(ctx);

        return ctx.prisma.account.create({
          data: {
            name,
            user: { connect: { id: userId } },
          },
        });
      },
    });

    t.field('createCategory', {
      type: 'Category',
      args: {
        name: stringArg({ nullable: false }),
        // type: stringArg({ nullable: false }),
        type: arg({ type: 'TransactionType', nullable: false }),
      },
      resolve: (parent, { name, type }, ctx: Context) => {
        const userId = getUserId(ctx);

        return ctx.prisma.category.create({
          data: {
            name,
            type,
            user: { connect: { id: userId } },
          },
        });
      },
    });

    t.field('createOperation', {
      type: 'Operation',
      args: {
        accountId: stringArg({ nullable: false }),
        categoryId: stringArg(),
        name: stringArg({ nullable: false }),
        type: arg({ type: 'TransactionType', nullable: false }),
        value: floatArg({ nullable: false }),
      },
      resolve: (parent, { accountId, name, value, type, categoryId }, ctx: Context) => {
        const userId = getUserId(ctx);
        console.log({ accountId });
        return ctx.prisma.operation.create({
          data: {
            name,
            value,
            type,
            account: { connect: { id: accountId } },
            user: { connect: { id: userId } },
            ...(!!categoryId && {
              category: { connect: { id: categoryId } },
            }),
          },
        });
      },
    });
  },
});
