import bcrypt from 'bcrypt';
import { Users } from './database';

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

      const newPassword = await bcrypt.hash(data.password, 4);

      return await Users.create({
        ...data,
        password: newPassword,
      });
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

      return user;
    },
  },
};
