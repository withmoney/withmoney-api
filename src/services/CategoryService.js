import database, { Categories as Model } from '../models';
import { categoryForm as form } from '../definitions';
import { categoryFilters as filters } from '../definitionsFilters';
import createResourceService, { serviceDefaultProps } from '../utils/createResourceService';

export const fields = [
  'id',
  'UserId',
  'name',
  'type',
  'createdAt',
  'updatedAt',
];

export default createResourceService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
