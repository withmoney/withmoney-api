import { Users } from '../models';
import { userForm } from '../definitions';
import creatorService from '../utils/creatorService';
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

const UserService = creatorService(Users, {
  definitions: userForm,
  filters: {
    fields,
    filter: {
      name: SelType.nameSelType,
      email: SelType.emailSelType,
    },
  },
});

export default UserService;
