import { objectType } from 'nexus';
import { CreditCard } from 'nexus-prisma';

export const CreditCardType = objectType({
  name: CreditCard.$name,
  description: CreditCard.$description,
  definition(t) {
    t.field(CreditCard.id);
    t.field(CreditCard.name);
    t.field(CreditCard.brand);
    t.field(CreditCard.limit);
    t.field(CreditCard.createdAt);
    t.field(CreditCard.updatedAt);
    t.field(CreditCard.deletedAt);
    t.field(CreditCard.user);
    t.field(CreditCard.account);
    t.field(CreditCard.operations);
  },
});

export const CreditCardsResult = objectType({
  name: 'CreditCardsResult',
  definition(t) {
    t.list.field('data', { type: 'CreditCard' });
    t.field('pagination', { type: 'Pagination' });
  },
});
