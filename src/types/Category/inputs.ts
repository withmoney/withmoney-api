import { inputObjectType, list } from 'nexus';

export const CategoryCreateInput = inputObjectType({
  name: 'CategoryCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
  },
});

export const CategoryUpdateInput = inputObjectType({
  name: 'CategoryUpdateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
  },
});

export const CategoryWhereUniqueInput = inputObjectType({
  name: 'CategoryWhereUniqueInput',
  definition(t) {
    t.nonNull.id('id');
  },
});

export const CategoryTypeFilter = inputObjectType({
  name: 'TransactionTypeFilter',
  definition(t) {
    t.field('equals', { type: 'TransactionType' });
    t.field('in', { type: list('TransactionType') });
    t.field('notIn', { type: list('TransactionType') });
    t.field('not', { type: 'TransactionType' });
  },
});

export const FilterString = inputObjectType({
  name: 'FilterString',
  definition(t) {
    t.string('contains');
  },
});

export const CategoryWhereInput = inputObjectType({
  name: 'CategoryWhereInput',
  definition(t) {
    t.field('name', { type: 'StringFilter' });
    t.field('type', { type: 'TransactionTypeFilter' });
    t.field('deletedAt', { type: 'DateTimeFilter' });
  },
});

export const CategoryOrderByInput = inputObjectType({
  name: 'CategoryOrderByInput',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
  },
});
