import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from './database';

const SECRET_SALT = process.env.SECRET_SALT || '2';
const SECRET_KEY = process.env.SECRET_SALT || '';

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ILogin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

      await Users.create({
        ...data,
        password: newPassword,
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
        token: jwt.sign({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }, SECRET_KEY),
      };
    },
  },
};
