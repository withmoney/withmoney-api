import { inputObjectType } from 'nexus';

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.field('birthDay', { type: 'Date' });
    t.field('language', { type: 'Locale' });
  },
});
