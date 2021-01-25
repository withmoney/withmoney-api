import { inputObjectType } from 'nexus';

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('email');
    t.string('name');
    t.string('nickname');
    t.date('birthday');
    t.string('phone');
    t.field('language', { type: 'Locale' });
  },
});
