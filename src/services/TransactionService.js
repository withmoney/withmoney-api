import { Transactions } from '../models';
import { transactionForm as definitions } from '../definitions';
import { transactionFilters as filters } from '../definitionsFilters';
import createResourceService from '../utils/createResourceService';
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

const TransactionService = createResourceService(Transactions, {
  definitions,
  options: { fields, filters },
});

export default TransactionService;
