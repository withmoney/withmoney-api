import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendVerifyEmail, sendWelcomeMessage, sendChangePasswordRequest } from './email';
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

interface IRequestChangePassword {
  email: string;
}

interface IChangePassword {
  hash: string;
  password: string;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  hasVerifiedEmail: boolean;
}

export const resolvers = {
  Query: {
    user: async (root: any, data: any, { user }: { user: IUser | null }) => {
      return user;
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

      const checkPassword = await bcrypt.compare(data.password, user.password);

      if (!checkPassword) {
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

    requestChangePassword: async (root: any, { email }: IRequestChangePassword) => {
      const searchUser = await Users.findOne({
        email,
      });

      if (!searchUser) return 'OK';

      const hashToChangePassword = uuidv4();

      searchUser.hashToChangePassword = hashToChangePassword;

      await searchUser.save();

      await sendChangePasswordRequest({
        firstName: searchUser.firstName,
        email: searchUser.email,
        hash: hashToChangePassword,
      });

      return 'OK';
    },
    changePassword: async (root: any, { hash, password }: IChangePassword) => {
      const searchUser = await Users.findOne({
        hashToChangePassword: hash,
      });

      if (!searchUser) {
        throw new Error('Invalid Hash');
      }

      const newPassword = await bcrypt.hash(password, parseInt(SECRET_SALT, 10));

      searchUser.hashToChangePassword = '';
      searchUser.password = newPassword;
      await searchUser.save();

      return 'OK';
    },
  },
};
