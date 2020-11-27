import { objectType } from '@nexus/schema';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});