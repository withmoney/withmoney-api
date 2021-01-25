import { inputObjectType, mutationType, stringArg, arg, floatArg, nonNull } from 'nexus';

export const RegisterInput = inputObjectType({
  name: 'RegisterInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.date('birthday');
    t.field('language', { type: 'Locale' });
    t.field('currency', { type: 'Currency' });
  },
});
