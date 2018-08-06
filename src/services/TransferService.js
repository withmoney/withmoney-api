import { Transfers } from '../models';
import { transferForm } from '../definitions';
import { transferFilters as filters } from '../definitionsFilters';
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
  options: { fields, filters },
});

export default TransferService;
