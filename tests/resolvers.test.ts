import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { typeDefs } from '../src/schema';
import { resolvers } from '../src/resolvers';
import { Users } from '../src/database';

jest.mock('../src/database', () => ({
  Users: {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      id: '5e584b5994515952cab4e97b',
      email: 'xexeu@gmail.com',
      password: '123456',
      firstName: 'Jhonny',
      lastName: 'Michel',
    }),
  },
}));

beforeAll(() => {
  process.env.SECRET_SALT = '8';
  process.env.SECRET_KEY = 'lessiknowitsbetter';
})

it('Should return a OK on register mutation', async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { mutate } = createTestClient(server);

  const REGISTER_USER = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
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
