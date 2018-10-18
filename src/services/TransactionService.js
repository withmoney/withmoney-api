import {
  createService,
  serviceDefaultProps,
} from 'fastexpress';
import database, { Transactions as Model } from '../models';
import { transactionForm as form } from '../definitions';
import { transactionFilters as filters } from '../definitionsFilters';
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

export default createService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
