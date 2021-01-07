import { objectType } from '@nexus/schema';

export const Operation = objectType({
  name: 'Operation',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.value();
    t.model.type();
    t.model.isPaid();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.account();
    t.model.user();
    t.model.category();
  },
});
