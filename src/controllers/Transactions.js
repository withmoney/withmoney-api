import { createController } from 'fastexpress';
import TransactionService from '../services/TransactionService';

const TransactionController = createController(TransactionService);

export default TransactionController;
