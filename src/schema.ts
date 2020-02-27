import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
  }

  type AuthPayload {
    token: String!
  }

  type Mutation {
    register(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): String
    login(email: String!, password: String!): AuthPayload
  }

  type Query {
    users: [User]
  }
`;
