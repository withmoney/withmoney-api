import {
  createService,
  serviceDefaultProps,
} from 'fastexpress';
import database, { Categories as Model } from '../models';
import { categoryForm as form } from '../definitions';
import { categoryFilters as filters } from '../definitionsFilters';
import { fields as transactionFields } from './TransactionService';

export const fields = [
  'id',
  'UserId',
  'name',
  'type',
  'createdAt',
  'updatedAt',
  { Transactions: transactionFields },
];

export default createService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
