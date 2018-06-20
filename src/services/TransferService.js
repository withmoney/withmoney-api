import { Transfers } from '../models';
import { transferForm } from '../definitions';
import createService from '../utils/createService';
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

const TransferService = createService(Transfers, {
  definitions: transferForm,
  options: { fields },
});

export default TransferService;
