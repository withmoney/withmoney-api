import { Router } from 'express';
import { Users as UsersModel } from './models';
import { injectModel } from './services/inject';
import { middleware } from './middleware';
import { resourcesAuth } from './services/resources';
import Auth from './controllers/Auth';
import Users from './controllers/Users';
import Accounts from './controllers/Accounts';
import Categories from './controllers/Categories';
import Transactions from './controllers/Transactions';
import Transfers from './controllers/Transfers';

const router = Router();

router.get('/', (req, res) => {
  res.send({
    apis: {
      v1: {
        users: [
          '[get] /api/v1/users',
          '[post] /api/v1/users',
          '[get] /api/v1/users/:id',
          '[delete] /api/v1/users/:id',
          '[put] /api/v1/users/:id',
          '[get] /api/v1/users/:id/accounts',
        ],
        accounts: [
          '[get] /api/v1/accounts',
          '[post] /api/v1/accounts',
          '[get] /api/v1/accounts/:id',
          '[delete] /api/v1/accounts/:id',
          '[put] /api/v1/accounts/:id',
        ],
        categories: [
          '[get] /api/v1/categories',
          '[post] /api/v1/categories',
          '[get] /api/v1/categories/:id',
          '[delete] /api/v1/categories/:id',
          '[put] /api/v1/categories/:id',
        ],
        transactions: [
          '[get] /api/v1/transactions',
          '[post] /api/v1/transactions',
          '[get] /api/v1/transactions/:id',
          '[delete] /api/v1/transactions/:id',
          '[put] /api/v1/transactions/:id',
        ],
        transfers: [
          '[get] /api/v1/transfers',
          '[post] /api/v1/transfers',
          '[get] /api/v1/transfers/:id',
          '[delete] /api/v1/transfers/:id',
          '[put] /api/v1/transfers/:id',
        ],
        auth: [
          '[post] /api/v1/login',
        ],
      },
    },
  });
});

const namespace = '/api/v1/';

// resourcesAuth
resourcesAuth(`${namespace}accounts`, {
  router,
  controller: Accounts,
  middleware,
});

resourcesAuth(`${namespace}categories`, {
  router,
  controller: Categories,
  middleware,
});

resourcesAuth(`${namespace}users`, {
  router,
  controller: Users,
  middleware,
});
resourcesAuth(`${namespace}transactions`, {
  router,
  controller: Transactions,
  middleware,
});
resourcesAuth(`${namespace}transfers`, {
  router,
  controller: Transfers,
  middleware,
});

// custom routers

router.get(
  `${namespace}users/:id/accounts`,
  middleware,
  Users.accounts(injectModel(UsersModel)),
);

router.post(`${namespace}login`, Auth.login);

export default router;
