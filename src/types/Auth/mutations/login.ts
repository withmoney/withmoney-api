import { compare } from 'bcryptjs';
import { ApolloError, ValidationError } from 'apollo-server';
import { mutationField, nonNull, arg, stringArg } from '@nexus/schema';
import { sign } from 'jsonwebtoken';

import { USER_SIGNED_IN, USER_UPDATED } from '../../Subscription';
import { APP_SECRET, getUserId } from '../../../utils';
import { sendVerifyEmail } from './../../../email';

export const Login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_parent, { email, password }, ctx) => {
    const { pubsub } = ctx;

    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ValidationError(`Email not found`);
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new ValidationError('Invalid password');
    }

    if (!user.hasVerifiedEmail) {
      throw new ValidationError('Email has not been confirmed');
    }

    pubsub.publish(USER_SIGNED_IN, user);
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
});
