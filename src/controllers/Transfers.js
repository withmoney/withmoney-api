import TransferService from '../services/TransferService';
import creatorController from '../utils/creatorController';

const TransferController = creatorController(TransferService);

export default TransferController;
