import { nonNull, objectType } from 'nexus';
import { PaymentMethod } from 'nexus-prisma';

export const PaymentMethodType = objectType({
  name: PaymentMethod.$name,
  description: PaymentMethod.$description,
  definition(t) {
    t.field(PaymentMethod.id);
    t.field(PaymentMethod.accountId);
    t.field(PaymentMethod.userId);
    t.field(PaymentMethod.name);
    t.field(PaymentMethod.createdAt);
    t.field(PaymentMethod.updatedAt);
    t.field(PaymentMethod.deletedAt);
  },
});

export const PaymentMethodListResult = objectType({
  name: 'PaymentMethodListResult',
  definition(t) {
    t.nonNull.list.field('data', { type: nonNull('PaymentMethod') });
    t.field('pagination', { type: 'Pagination' });
  },
});

export const PaymentMethodSingleResult = objectType({
  name: 'PaymentMethodSingleResult',
  definition(t) {
    t.field('data', { type: 'PaymentMethod' });
  },
});
