import * as path from 'path';
import * as types from './types';

import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

export const schema = makeSchema({
  types,
  plugins: [
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
