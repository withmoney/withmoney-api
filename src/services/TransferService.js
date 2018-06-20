import { Transfers } from '../models';
import { transferForm } from '../definitions';
import creatorService from '../utils/creatorService';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'value',
  'accountToId',
  'accountFromId',
  'transferDate',
  'createdAt',
  'updatedAt',
  {
    AccountFrom: accountFields,
    AccountTo: accountFields,
  },
];

const TransferService = creatorService(Transfers, {
  definitions: transferForm,
  filters: { fields },
});

export default TransferService;
