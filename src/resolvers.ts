import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendVerifyEmail, sendWelcomeMessage } from './email';
import { Users } from './database';

if (!process.env.SECRET_SALT) {
  /* istanbul ignore next */
  throw new Error('SECRET_SALT env is undefined');
}

if (!process.env.SECRET_KEY) {
  /* istanbul ignore next */
  throw new Error('SECRET_KEY env is undefined');
}

const { SECRET_SALT, SECRET_KEY } = process.env;

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ICheckHashEmail {
  hash: string;
}

export const resolvers = {
  Query: {
    users: () => {
      return Users.find();
    },
  },
  Mutation: {
    register: async (root: any, data: IRegister) => {
      const searchUser = await Users.findOne({
        email: data.email,
      });

      if (searchUser) {
        throw new Error('The User already exists!');
      }

      const newPassword = await bcrypt.hash(data.password, parseInt(SECRET_SALT, 10));
      const hashToVerifyEmail = uuidv4();

      await Users.create({
        ...data,
        password: newPassword,
        hasVerifiedEmail: false,
        hashToVerifyEmail,
      });

      await sendVerifyEmail({
        firstName: data.firstName,
        email: data.email,
        hash: hashToVerifyEmail,
      });

      return 'OK';
    },

    login: async (root: any, data: ILogin) => {
      const user = await Users.findOne({
        email: data.email,
      });

      if (!user) {
        throw new Error('Email or Password invalid');
      }

      if (await !bcrypt.compare(data.password, user.password)) {
        throw new Error('Email or Password invalid');
      }

      return {
        token: jwt.sign(
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hasVerifiedEmail: user.hasVerifiedEmail,
          },
          SECRET_KEY,
        ),
      };
    },

    checkHashEmail: async (root: any, { hash }: ICheckHashEmail) => {
      const searchUser = await Users.findOne({
        hashToVerifyEmail: hash,
      });

      if (!searchUser) {
        throw new Error('Invalid Hash');
      }

      searchUser.hasVerifiedEmail = true;
      searchUser.hashToVerifyEmail = '';
      await searchUser.save();

      await sendWelcomeMessage({
        firstName: searchUser.firstName,
        email: searchUser.email,
      });

      return 'OK';
    },
  },
};
