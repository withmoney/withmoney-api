import TransactionService from '../services/TransactionService';
import creatorController from '../utils/creatorController';

const TransactionController = creatorController(TransactionService);

export default TransactionController;
