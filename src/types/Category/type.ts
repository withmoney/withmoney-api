import { nonNull, objectType } from 'nexus';
import { Category } from 'nexus-prisma';

export const CategoryType = objectType({
  name: Category.$name,
  description: Category.$description,
  definition(t) {
    t.field(Category.id);
    t.field(Category.name);
    t.field(Category.type);
    t.field(Category.createdAt);
    t.field(Category.updatedAt);
    t.field(Category.deletedAt);
    t.field(Category.user);
    t.field(Category.operations);
  },
});

export const CategoriesResult = objectType({
  name: 'CategoriesResult',
  definition(t) {
    t.nonNull.list.field('data', { type: nonNull('Category') });
    t.field('pagination', { type: 'Pagination' });
  },
});
