import database, { Users as Model } from '../models';
import { userForm as form } from '../definitions';
import { userFilters as filters } from '../definitionsFilters';
import createResourceService, { serviceDefaultProps } from '../utils/createResourceService';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'name',
  'email',
  'password',
  'enabled',
  'createdAt',
  'updatedAt',
  {
    Accounts: accountFields,
  },
];

export default createResourceService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
