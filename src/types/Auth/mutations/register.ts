import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import { ValidationError } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { mutationField, nonNull, arg } from 'nexus';
import { sendVerifyEmail } from './../../../email';
import { accountsSeed, categoriesSeed } from './../../../lang/seed';
import { Currency, Locale } from './../../Enum';

export const Register = mutationField('register', {
  type: 'String',
  args: {
    user: nonNull(arg({ type: 'RegisterInput' })),
  },
  resolve: async (_parent, { user }, ctx) => {
    const { firstName, lastName, email, password, language, currency } = user;
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

    const newUser = await ctx.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        language,
        hashToVerifyEmail,
        password: hashedPassword,
        hasVerifiedEmail: false,
      },
    });

    await newUserSeed({ userId: newUser.id, currency, language, prisma: ctx.prisma });

    await sendVerifyEmail({
      firstName,
      email,
      hash: hashToVerifyEmail,
    });

    return 'OK';
  },
});

interface newUserSeedProps {
  userId: string;
  prisma: PrismaClient;
  language: Locale;
  currency: Currency;
}

const newUserSeed = async ({
  userId,
  language = 'enUS',
  currency = 'USD',
  prisma,
}: newUserSeedProps) => {
  await Promise.all(
    accountsSeed[language].map((name) =>
      prisma.account.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          name,
          currency,
        },
      }),
    ),
  );

  await Promise.all(
    categoriesSeed[language].map(([name, type]) =>
      prisma.category.create({
        data: {
          name,
          type,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      }),
    ),
  );
};
