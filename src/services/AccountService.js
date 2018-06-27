import { Accounts } from '../models';
import { accountForm } from '../definitions';
import createResourceService from '../utils/createResourceService';

export const fields = [
  'id',
  'UserId',
  'name',
  'type',
  'initalValue',
  'createdAt',
  'updatedAt',
];

const AccountService = createResourceService(Accounts, {
  definitions: accountForm,
  options: { fields },
});

export default AccountService;
