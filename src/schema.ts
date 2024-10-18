import * as path from 'path';
import * as types from './types';

import { makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars'

export const schema = makeSchema({
  types: [types, NexusPrismaScalars],
  outputs: {
    schema: path.join(__dirname, './../schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  contextType: {
    module: path.join(__dirname, './context.ts'),
    alias: 'Context',
    export: 'Context',
  },
});
