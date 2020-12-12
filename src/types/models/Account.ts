import { objectType } from '@nexus/schema';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.user();
    t.model.operations({ pagination: true, filtering: true, ordering: true });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
