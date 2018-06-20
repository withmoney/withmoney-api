import { Transactions } from '../models';
import { transactionForm } from '../definitions';
import createService from '../utils/createService';
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

const TransactionService = createService(Transactions, {
  definitions: transactionForm,
  options: { fields },
});

export default TransactionService;
