import { ValidationError } from 'apollo-server-express';
import { mutationField, nonNull, arg, stringArg } from '@nexus/schema';
import { sendWelcomeMessage } from './../../../email';

export const CheckHashEmail = mutationField('checkHashEmail', {
  type: 'String',
  args: {
    hash: nonNull(stringArg()),
  },
  resolve: async (_parent, { hash }, ctx) => {
    const searchUser = await ctx.prisma.user.findUnique({
      where: { hashToVerifyEmail: hash },
    });

    if (!searchUser) {
      throw new ValidationError('Invalid Hash');
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
