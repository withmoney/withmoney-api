import { inputObjectType } from 'nexus';

export const CategoryCreateInput = inputObjectType({
  name: 'CategoryCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
    t.nonNull.field('operationType', { type: 'OperationTypeEnum' });
  },
});

export const CategoryUpdateInput = inputObjectType({
  name: 'CategoryUpdateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
    t.nonNull.field('operationType', { type: 'OperationTypeEnum' });
  },
});
