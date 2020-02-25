import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
  }

  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): User
    login(email: String!, password: String!): User
  }

  type Query {
    users: [User]
  }
`;
