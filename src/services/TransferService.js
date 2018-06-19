import { Transfers } from '../models';
import { transferForm } from '../definitions';
import creatorService from '../utils/creatorService';

const TransferService = creatorService(Transfers, { definitions: transferForm });

export default TransferService;
