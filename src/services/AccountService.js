import {
  createService,
  serviceDefaultProps,
} from 'fastexpress';
import database, { Accounts as Model } from '../models';
import { accountForm as form } from '../definitions';
import { accountFilters as filters } from '../definitionsFilters';

export const fields = [
  'id',
  'UserId',
  'name',
  'type',
  'initalValue',
  'createdAt',
  'updatedAt',
];

export default createService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
