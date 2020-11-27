import { objectType } from '@nexus/schema';

export const Transaction = objectType({
  name: 'Transaction',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.value();
    t.model.type();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.account();
    t.model.user();
    t.model.category();
  },
});
