import TransactionService from '../services/TransactionService';
import createController from '../utils/createController';

const TransactionController = createController(TransactionService);

export default TransactionController;
