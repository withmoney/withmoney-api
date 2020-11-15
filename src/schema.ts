import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    hasVerifiedEmail: String!
  }

  type AuthPayload {
    token: String!
  }

  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): String
    login(email: String!, password: String!): AuthPayload
    checkHashEmail(hash: String!): String
    requestChangePassword(email: String): String
    changePassword(hash: String!, password: String!): String
  }

  type Query {
    user: User
  }
`;
