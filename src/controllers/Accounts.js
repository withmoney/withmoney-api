import AccountService from '../services/AccountService';
import creatorController from '../utils/creatorController';

const AccountController = creatorController(AccountService);

export default AccountController;
