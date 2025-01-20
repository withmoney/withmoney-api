import { inputObjectType } from 'nexus';

export const DateTimeFilter = inputObjectType({
  name: 'DateTimeFilter',
  definition(t) {
    t.field('equals', { type: 'DateTime' });
    t.field('gt', { type: 'DateTime' });
    t.field('gte', { type: 'DateTime' });
    t.field('lt', { type: 'DateTime' });
    t.field('lte', { type: 'DateTime' });
  },
});

export const StringFilter = inputObjectType({
  name: 'StringFilter',
  definition(t) {
    t.string('equals');
    t.string('contains');
    t.string('startsWith');
    t.string('endsWith');
  },
});

export const IdFilter = inputObjectType({
  name: 'IdFilter',
  definition(t) {
    t.id('equals');
  },
});
