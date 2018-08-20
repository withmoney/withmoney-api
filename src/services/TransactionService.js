import database, { Transactions as Model } from '../models';
import { transactionForm as form } from '../definitions';
import { transactionFilters as filters } from '../definitionsFilters';
import createResourceService, { serviceDefaultProps } from '../utils/createResourceService';
import { fields as accountFields } from './AccountService';
import { fields as categoryFields } from './CategoryService';

export const fields = [
  'id',
  'UserId',
  'AccountId',
  'CategoryId',
  'name',
  'value',
  'type',
  'isPaid',
  'transactionDate',
  'createdAt',
  'updatedAt',
  { Account: accountFields },
  { Category: categoryFields },
];

export default createResourceService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
