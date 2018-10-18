import {
  createService,
  serviceDefaultProps,
} from 'fastexpress';
import database, { Users as Model } from '../models';
import { userForm as form } from '../definitions';
import { userFilters as filters } from '../definitionsFilters';
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

export default createService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
