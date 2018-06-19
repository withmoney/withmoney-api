import { Accounts } from '../models';
import { accountForm } from '../definitions';
import creatorService from '../utils/creatorService';

const AccountService = creatorService(Accounts, { definitions: accountForm });

export default AccountService;
