import TransferService from '../services/TransferService';
import createResourceController from '../utils/createResourceController';

const TransferController = createResourceController(TransferService);

export default TransferController;
