import { inputObjectType } from '@nexus/schema';

export const OperationCreateInput = inputObjectType({
  name: 'OperationCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
    t.nonNull.float('value');
    t.string('categoryId');
    t.nonNull.string('accountId');
  },
});

export const OperationUpdateInput = inputObjectType({
  name: 'OperationUpdateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
    t.nonNull.float('value');
    t.string('categoryId');
    t.nonNull.string('accountId');
  },
});
