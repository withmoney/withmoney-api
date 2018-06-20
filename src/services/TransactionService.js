import { Transactions } from '../models';
import { transactionForm } from '../definitions';
import creatorService from '../utils/creatorService';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'accountId',
  'name',
  'value',
  'type',
  'isPaid',
  'transationDate',
  'createdAt',
  'updatedAt',
  { Account: accountFields },
];

const TransactionService = creatorService(Transactions, {
  definitions: transactionForm,
  filters: { fields },
});

export default TransactionService;
