import { Users } from '../models';
import { userForm } from '../definitions';
import createService from '../utils/createService';
import * as SelType from '../selectorTypes';
import { fields as accountFields } from './AccountService';

export const fields = [
  'id',
  'name',
  'email',
  'createdAt',
  'updatedAt',
  {
    Accounts: accountFields,
  },
];

const UserService = createService(Users, {
  definitions: userForm,
  options: {
    fields,
    filters: {
      name: SelType.nameSelType,
      email: SelType.emailSelType,
    },
  },
});

export default UserService;
