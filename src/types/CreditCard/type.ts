import { objectType } from 'nexus';

export const CreditCard = objectType({
  name: 'CreditCard',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.brand();
    t.model.limit();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.user();
    t.model.operations({ pagination: true, filtering: true, ordering: true });
  },
});

export const CreditCardsResult = objectType({
  name: 'CreditCardsResult',
  definition(t) {
    t.list.field('data', { type: 'CreditCard' });
    t.field('pagination', { type: 'Pagination' });
  },
});
