import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import { ValidationError } from 'apollo-server-express';
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

    const foundEmail = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundEmail) {
      throw new ValidationError('Email has been found');
    }

    await ctx.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashToVerifyEmail,
        password: hashedPassword,
        hasVerifiedEmail: false,
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
