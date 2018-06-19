import { Transactions } from '../models';
import { transactionForm } from '../definitions';
import creatorService from '../utils/creatorService';

const TransactionService = creatorService(Transactions, { definitions: transactionForm });

export default TransactionService;
