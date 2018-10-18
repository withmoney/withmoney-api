import { createController } from 'fastexpress';
import AccountService from '../services/AccountService';

const AccountController = createController(AccountService);

export default AccountController;
