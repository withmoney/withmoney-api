import { inputObjectType } from 'nexus';

export const PaymentMethodCreateInput = inputObjectType({
  name: 'PaymentMethodCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('accountId');
  },
});

export const PaymentMethodUpdateInput = inputObjectType({
  name: 'PaymentMethodUpdateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('accountId');
  },
});

export const PaymentMethodWhereUniqueInput = inputObjectType({
  name: 'PaymentMethodWhereUniqueInput',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const PaymentMethodWhereInput = inputObjectType({
  name: 'PaymentMethodWhereInput',
  definition(t) {
    t.field('name', { type: 'StringFilter' });
    t.field('accountId', { type: 'IdFilter' });
    t.field('createdAt', { type: 'DateTimeFilter' });
    t.field('updatedAt', { type: 'DateTimeFilter' });
    t.field('deletedAt', { type: 'DateTimeFilter' });
  },
});

export const PaymentMethodOrderByInput = inputObjectType({
  name: 'PaymentMethodOrderByInput',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
    t.field('createdAt', { type: 'SortOrder' });
  },
});
