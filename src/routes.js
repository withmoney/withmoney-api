import { Router } from 'express';
import {
  resourceList,
  resourceWithAuth,
  namespaceIndexCreator,
  namespaceCreator,
  createMiddleware,
} from 'fastexpress';
import { Users as UsersModel } from './models';
import { injectModel } from './services/inject';
import Auth from './controllers/Auth';
import Users from './controllers/Users';
import Accounts from './controllers/Accounts';
import Categories from './controllers/Categories';
import Transactions from './controllers/Transactions';
import Journals from './controllers/Journals';
import config from '../config/envs';

const router = Router();

const middleware = createMiddleware(config.JWT_ENCRYPTION);
const namespace = namespaceCreator(config.NAMESPACE);
const indexCreator = namespaceIndexCreator(namespace);

router.get('/', (req, res) => {
  res.send(indexCreator({
    users: resourceList('users', {
      custom: [
        `[get] ${namespace('users/:id/accounts')}`,
      ],
      namespace,
    }),
    accounts: resourceList('accounts', { namespace }),
    categories: resourceList('categories', { namespace }),
    transactions: resourceList('transactions', { namespace }),
    journals: resourceList('journals', { namespace }),
    auth: [
      `[post] ${namespace('login')}`,
      `[post] ${namespace('signup')}`,
    ],
  }));
});

const options = { router, middleware, namespace };

resourceWithAuth('accounts', Accounts, options);
resourceWithAuth('categories', Categories, options);
resourceWithAuth('users', Users, options);
resourceWithAuth('transactions', Transactions, options);
resourceWithAuth('journals', Journals, options);

// custom routers

router.get(
  namespace('users/:id/accounts'),
  middleware,
  Users.accounts,
);

router.post(namespace('login'), Auth.login);
router.post(namespace('signup'), Users.create);

export default router;
