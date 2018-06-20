import AccountService from '../services/AccountService';
import createResourceController from '../utils/createResourceController';

const AccountController = createResourceController(AccountService);

export default AccountController;
