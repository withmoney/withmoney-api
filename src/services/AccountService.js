import database, { Accounts as Model } from '../models';
import { accountForm as form } from '../definitions';
import { accountFilters as filters } from '../definitionsFilters';
import createResourceService, { serviceDefaultProps } from '../utils/createResourceService';

export const fields = [
  'id',
  'UserId',
  'name',
  'type',
  'initalValue',
  'createdAt',
  'updatedAt',
];

export default createResourceService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
