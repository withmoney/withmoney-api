import { objectType } from 'nexus';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.user();
    t.model.operations({ pagination: true, filtering: true, ordering: true });
  },
});
