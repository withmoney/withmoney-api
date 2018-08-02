import { Transactions } from '../models';
import { transactionForm as definitions } from '../definitions';
import { transactionFilters as filters } from '../definitionsFilters';
import createResourceService from '../utils/createResourceService';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'AccountId',
  'name',
  'value',
  'type',
  'isPaid',
  'transactionDate',
  'createdAt',
  'updatedAt',
  { Account: accountFields },
];

const TransactionService = createResourceService(Transactions, {
  definitions,
  options: { fields, filters },
});

export default TransactionService;
