import { Accounts } from '../models';
import { accountForm } from '../definitions';
import createService from '../utils/createService';

export const fields = [
  'id',
  'userId',
  'UserId',
  'name',
  'type',
  'initalValue',
  'createdAt',
  'updatedAt',
];

const AccountService = createService(Accounts, {
  definitions: accountForm,
  options: { fields },
});

export default AccountService;
