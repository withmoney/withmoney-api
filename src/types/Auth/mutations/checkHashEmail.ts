import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcryptjs';
import { mutationField, nonNull, arg, stringArg } from '@nexus/schema';
import { sign } from 'jsonwebtoken';

import { USER_SIGNED_IN, USER_UPDATED } from '../../Subscription';
import { APP_SECRET, getUserId } from '../../../utils';
import { sendWelcomeMessage } from './../../../email';

export const CheckHashEmail = mutationField('checkHashEmail', {
  type: 'String',
  args: {
    hash: nonNull(stringArg()),
  },
  resolve: async (_parent, { hash }, ctx) => {
    const searchUser = await ctx.prisma.user.findUnique({ where: { hashToVerifyEmail: hash } });

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
