import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from 'bcryptjs';
import { mutationField, nonNull, arg } from '@nexus/schema';
import { sendVerifyEmail } from './../../../email';

export const Register = mutationField('register', {
  type: 'String',
  args: {
    user: nonNull(arg({ type: 'RegisterInput' })),
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
