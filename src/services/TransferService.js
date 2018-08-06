import { Transfers } from '../models';
import { transferForm } from '../definitions';
import createResourceService from '../utils/createResourceService';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'UserId',
  'value',
  'AccountToId',
  'AccountFromId',
  'transferDate',
  'createdAt',
  'updatedAt',
  {
    AccountFrom: accountFields,
    AccountTo: accountFields,
  },
];

const TransferService = createResourceService(Transfers, {
  definitions: transferForm,
  options: { fields },
});

export default TransferService;
