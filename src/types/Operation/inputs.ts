import { inputObjectType } from 'nexus';

export const OperationCreateInput = inputObjectType({
  name: 'OperationCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
    t.nonNull.float('value');
    t.nonNull.boolean('isPaid');
    t.datetime('paidAt');
    t.string('categoryId');
    t.string('creditCardId');
    t.nonNull.string('accountId');
  },
});

export const OperationUpdateInput = inputObjectType({
  name: 'OperationUpdateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.field('type', { type: 'TransactionType' });
    t.nonNull.float('value');
    t.nonNull.boolean('isPaid');
    t.datetime('paidAt');
    t.string('categoryId');
    t.string('creditCardId');
    t.nonNull.string('accountId');
  },
});

export const CalcPreviousBalancePaidAtInput = inputObjectType({
  name: 'CalcPreviousBalancePaidAtInput',
  definition(t) {
    t.datetime('lt');
  },
});

export const CalcPreviousBalanceWhereInput = inputObjectType({
  name: 'CalcPreviousBalanceWhereInput',
  definition(t) {
    t.nonNull.string('accountId');
    t.field('paidAt', { type: CalcPreviousBalancePaidAtInput });
  },
});

export const CalcCreditCardsLimitWhereInput = inputObjectType({
  name: 'CalcCreditCardsLimitWhereInput',
  definition(t) {
    t.nonNull.field('accountId', { type: 'ID' });
  },
});

export const OperationWhereInput = inputObjectType({
  name: 'OperationWhereInput',
  definition(t) {
    t.string('description');
    t.float('value');
    t.boolean('isPaid');
    t.id('creditCardId');
    t.field('paidAt', { type: 'DateTimeFilter' });
    t.field('deletedAt', { type: 'DateTimeFilter' });
    t.field('accountId', { type: 'StringFilter' });
  },
});

export const OperationOrderByInput = inputObjectType({
  name: 'OperationOrderByInput',
  definition(t) {
    t.field('description', { type: 'SortOrder' });
    t.field('value', { type: 'SortOrder' });
    t.field('isPaid', { type: 'SortOrder' });
    t.field('paidAt', { type: 'SortOrder' });
    t.field('createdAt', { type: 'SortOrder' });
  },
});
