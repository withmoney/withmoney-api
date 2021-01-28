import { objectType } from 'nexus';

export const Operation = objectType({
  name: 'Operation',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.value();
    t.model.type();
    t.model.isPaid();
    t.model.paidAt();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.account();
    t.model.accountId();
    t.model.user();
    t.model.userId();
    t.model.category();
    t.model.categoryId();
  },
});
