import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.firstName();
    t.model.lastName();
    t.model.hasVerifiedEmail();
    t.model.birthDay();
    t.model.accounts({ pagination: true, filtering: true, ordering: true });
    t.model.categories({ pagination: true, filtering: true, ordering: true });
    t.model.operations({ pagination: true, filtering: true, ordering: true });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
