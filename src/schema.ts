// import { gql } from 'apollo-server-express';

// export const typeDefs = gql`
//   type User {
//     id: ID!
//     firstName: String
//     lastName: String
//     email: String!
//     hasVerifiedEmail: String!
//   }

//   type AuthPayload {
//     token: String!
//   }

//   type Mutation {
//     register(email: String!, password: String!, firstName: String!, lastName: String!): String
//     login(email: String!, password: String!): AuthPayload
//     checkHashEmail(hash: String!): String
//     requestChangePassword(email: String): String
//     changePassword(hash: String!, password: String!): String
//   }

//   type Query {
//     user: User
//   }
// `;

import * as path from 'path';
import * as types from './types';

import { makeSchema, declarativeWrappingPlugin } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

export const schema = makeSchema({
  types,
  plugins: [
    declarativeWrappingPlugin(),
    // nexusSchemaPrisma(),
    nexusSchemaPrisma({
      // Generate typefiles on any occasions
      shouldGenerateArtifacts: true,
      outputs: {
        typegen: __dirname + '/generated/typegen-nexus-plugin-prisma.d.ts',
      },
    }),
  ],
  outputs: {
    schema: path.join(__dirname, './../schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
});
