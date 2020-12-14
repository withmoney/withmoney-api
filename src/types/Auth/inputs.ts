import { inputObjectType, mutationType, stringArg, arg, floatArg, nonNull } from '@nexus/schema';

export const RegisterInput = inputObjectType({
  name: 'RegisterInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.date('birthday');
  },
});
