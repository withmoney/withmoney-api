import TransactionService from '../services/TransactionService';
import createResourceController from '../utils/createResourceController';

const TransactionController = createResourceController(TransactionService);

export default TransactionController;
