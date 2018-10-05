import { Router } from 'express';
import { Users as UsersModel } from './models';
import { injectModel } from './services/inject';
import { middleware } from './middleware';
import {
  resourceList,
  resourceWithAuth,
  namespace,
  namespaceIndexCreator,
} from './utils/routers';
import Auth from './controllers/Auth';
import Users from './controllers/Users';
import Accounts from './controllers/Accounts';
import Categories from './controllers/Categories';
import Transactions from './controllers/Transactions';
import Journals from './controllers/Journals';

const router = Router();

router.get('/', (req, res) => {
  res.send(namespaceIndexCreator({
    users: resourceList('users', [
      '[get] /api/v1/users/:id/accounts',
    ]),
    accounts: resourceList('accounts'),
    categories: resourceList('categories'),
    transactions: resourceList('transactions'),
    journals: resourceList('journals'),
    auth: [
      '[post] /api/v1/login',
    ],
  }));
});

const options = { router, middleware };

resourceWithAuth('accounts', Accounts, options);
resourceWithAuth('categories', Categories, options);
resourceWithAuth('users', Users, options);
resourceWithAuth('transactions', Transactions, options);
resourceWithAuth('journals', Journals, options);

// custom routers

router.get(
  namespace('users/:id/accounts'),
  middleware,
  Users.accounts(injectModel(UsersModel)),
);

router.post(namespace('login'), Auth.login);

export default router;
