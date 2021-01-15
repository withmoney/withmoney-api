import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcryptjs';
import { mutationField, nonNull, arg, stringArg } from 'nexus';
import { sign } from 'jsonwebtoken';

import { USER_SIGNED_IN, USER_UPDATED } from '../../Subscription';
import { APP_SECRET, getUserId } from '../../../utils';
import { sendChangePasswordRequest } from './../../../email';

export const ChangePassword = mutationField('changePassword', {
  type: 'String',
  args: {
    hash: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_parent, { hash: hashToChangePassword, password }, ctx) => {
    const searchUser = await ctx.prisma.user.findUnique({ where: { hashToChangePassword } });

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
