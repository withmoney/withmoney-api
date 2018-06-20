import { Users } from '../models';
import { userForm } from '../definitions';
import createResourceService from '../utils/createResourceService';
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

const UserService = createResourceService(Users, {
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
