import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcryptjs';
import { mutationField, nonNull, arg, stringArg } from 'nexus';
import { sign } from 'jsonwebtoken';

import { USER_SIGNED_IN, USER_UPDATED } from '../../Subscription';
import { APP_SECRET, getUserId } from '../../../utils';
import { sendChangePasswordRequest } from './../../../email';

export const RequestChangePassword = mutationField('requestChangePassword', {
  type: 'String',
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_parent, { email }, ctx) => {
    const searchUser = await ctx.prisma.user.findUnique({ where: { email } });

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
