import { ValidationError } from 'apollo-server';
import { compare, hash } from 'bcryptjs';
import { mutationField, nonNull, stringArg } from 'nexus';

import { getUserId } from '../../../utils';

export const ChangeUserPassword = mutationField('changeUserPassword', {
  type: 'String',
  args: {
    oldPassword: nonNull(stringArg()),
    newPassword: nonNull(stringArg()),
  },
  resolve: async (_parent, { oldPassword, newPassword }, ctx) => {
    const userId = await getUserId(ctx);

    const user = await ctx.prisma.user.findUnique({ where: { id: userId } });

    const passwordValid = await compare(oldPassword, user.password);
    if (!passwordValid) {
      throw new ValidationError('Invalid password');
    }

    const hashedPassword = await hash(newPassword, 10);

    await ctx.prisma.user.update({
      where: {
        id: userId,
      },
      data: { password: hashedPassword },
    });

    return 'OK';
  },
});
