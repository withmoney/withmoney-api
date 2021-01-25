import { inputObjectType } from 'nexus';

export const AccountCreateInput = inputObjectType({
  name: 'AccountCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.field('currency', { type: 'Currency' });
  },
});

export const AccountUpdateInput = inputObjectType({
  name: 'AccountUpdateInput',
  definition(t) {
    t.nonNull.string('name');
    t.field('currency', { type: 'Currency' });
  },
});
