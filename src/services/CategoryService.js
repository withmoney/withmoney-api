import database, { Categories } from '../models';
import { categoryForm } from '../definitions';
import { categoryFilters as filters } from '../definitionsFilters';

import createResourceService from '../utils/createResourceService';

export const fields = [
  'id',
  'UserId',
  'name',
  'type',
  'createdAt',
  'updatedAt',
];

const CategoryService = createResourceService(Categories, {
  definitions: categoryForm,
  options: { fields, filters },
  database,
});

export default CategoryService;
