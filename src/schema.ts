import * as path from 'path';
import * as types from './types';

import { makeSchema, inputObjectType } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';

// export const AccountUpdateInput = inputObjectType({
//   name: 'AccountUpdateInput',
//   definition(t) {
//     t.nonNull.string('name');
//   },
// });

export const schema = makeSchema({
  types: types,
  plugins: [
    // paljs({
    //   doNotUseFieldUpdateOperationsInput: true,
    // }),
    // nexusPrisma(),
    nexusSchemaPrisma({
      shouldGenerateArtifacts: true,
      outputs: {
        typegen: __dirname + '/generated/typegen-nexus-plugin-prisma.d.ts',
      },
    }),
  ],
  // plugins: [
  //   nexusSchemaPrisma({
  //     // Generate typefiles on any occasions
  //     experimentalCRUD: true,
  //     shouldGenerateArtifacts: true,
  //     outputs: {
  //       typegen: __dirname + '/generated/typegen-nexus-plugin-prisma.d.ts',
  //     },
  //   }),
  // ],
  outputs: {
    schema: path.join(__dirname, './../schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
