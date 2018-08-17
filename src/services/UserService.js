import database, { Users } from '../models';
import { userForm } from '../definitions';
import { userFilters as filters } from '../definitionsFilters';
import createResourceService from '../utils/createResourceService';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'name',
  'email',
  'password',
  'enabled',
  'createdAt',
  'updatedAt',
  {
    Accounts: accountFields,
  },
];

const UserService = createResourceService(Users, {
  definitions: userForm,
  options: { fields, filters },
  database,
});

export default UserService;
