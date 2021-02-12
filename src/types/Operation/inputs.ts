import { inputObjectType, objectType } from 'nexus';

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
    t.field('paidAt', { type: CalcPreviousBalancePaidAtInput });
  },
});
