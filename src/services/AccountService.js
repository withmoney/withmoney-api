import { Accounts } from '../models';
import { accountForm } from '../definitions';
import creatorService from '../utils/creatorService';

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

const AccountService = creatorService(Accounts, {
  definitions: accountForm,
  filters: { fields },
});

export default AccountService;
