import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.firstName);
    t.field(User.lastName);
    t.field(User.hasVerifiedEmail);
    t.field(User.birthDay);
    t.field(User.language);
    t.field(User.accounts);
    t.field(User.categories);
    t.field(User.operations);
    t.field(User.creditCards);
    t.field(User.createdAt);
    t.field(User.updatedAt);
    t.field(User.deletedAt);
  },
});
