import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { typeDefs } from '../src/schema';
import { resolvers } from '../src/resolvers';
import { Users } from '../src/database';

const entity = {
  id: '5e584b5994515952cab4e97b',
  email: 'xexeu@gmail.com',
  password: '$2b$04$V2BrnJds.QlkvQQaGgW1.u7xbP4RDKz729JXh/yxCdrI4fY/ROdfq',
  firstName: 'Jhonny',
  lastName: 'Michel',
  hasVerifiedEmail: false,
};

jest.mock('../src/database', () => ({
  Users: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: jest.fn().mockResolvedValue(null),
  }),
}));

it('Should return a OK on register mutation', async () => {
  Users.findOne = jest.fn().mockResolvedValue(null);
  Users.create = jest.fn().mockResolvedValue(entity);

  const server = new ApolloServer({ typeDefs, resolvers });

  const { mutate } = createTestClient(server);

  const REGISTER_USER = gql`
    mutation Register(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      register(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
    }
  `;

  const res = await mutate({
    mutation: REGISTER_USER,
    variables: {
      firstName: 'Jhonny',
      lastName: 'Michel',
      email: 'xexeu@gmail.com',
      password: '123456',
    },
  });

  expect(res).toMatchSnapshot();
});

it('Should return a token on login mutation', async () => {
  Users.findOne = jest.fn().mockResolvedValue(entity);
  const server = new ApolloServer({ typeDefs, resolvers });

  const { mutate } = createTestClient(server);

  const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const res = await mutate({
    mutation: LOGIN_USER,
    variables: {
      email: 'xexeu@gmail.com',
      password: '123456',
    },
  });

  expect(res).toEqual({
    data: {
      login: {
        token: expect.any(String),
      },
    },
    errors: undefined,
    extensions: undefined,
    http: expect.any(Object),
  });
});

it('Should return a OK on checkHashEmail mutation', async () => {
  Users.findOne = jest.fn().mockResolvedValue({
    firstName: 'David',
    email: 'davidcostadev@gmail.com',
    save: () => Promise.resolve(),
  });

  const server = new ApolloServer({ typeDefs, resolvers });

  const { mutate } = createTestClient(server);

  const CHECK_HASH_EMAIL = gql`
    mutation checkHashEmail($hash: String!) {
      checkHashEmail(hash: $hash)
    }
  `;

  const res = await mutate({
    mutation: CHECK_HASH_EMAIL,
    variables: {
      hash: '12345',
    },
  });

  expect(res).toMatchSnapshot();
});
