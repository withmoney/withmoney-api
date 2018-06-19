import { Router } from 'express';
import { Users as UsersModel } from './models';
import { injectModel } from './services/inject';
import * as Users from './controllers/Users';
import * as Accounts from './controllers/Accounts';
import * as Transactions from './controllers/Transactions';
import * as Transfers from './controllers/Transfers';

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
      },
    },
  });
});

// users

router.get('/api/v1/users', Users.list);
router.post('/api/v1/users', Users.create);
router.get('/api/v1/users/:id', Users.get);
router.delete('/api/v1/users/:id', Users.destroy);
router.put('/api/v1/users/:id', Users.update);

// users associated

router.get('/api/v1/users/:id/accounts', Users.accounts(injectModel(UsersModel)));

// accounts

router.get('/api/v1/accounts', Accounts.list);
router.post('/api/v1/accounts', Accounts.create);
router.get('/api/v1/accounts/:id', Accounts.get);
router.delete('/api/v1/accounts/:id', Accounts.destroy);
router.put('/api/v1/accounts/:id', Accounts.update);

// transactions

router.get('/api/v1/transactions', Transactions.list);
router.post('/api/v1/transactions', Transactions.create);
router.get('/api/v1/transactions/:id', Transactions.get);
router.delete('/api/v1/transactions/:id', Transactions.destroy);
router.put('/api/v1/transactions/:id', Transactions.update);

// transfers

router.get('/api/v1/transfers', Transfers.list);
router.post('/api/v1/transfers', Transfers.create);
router.get('/api/v1/transfers/:id', Transfers.get);
router.delete('/api/v1/transfers/:id', Transfers.destroy);
router.put('/api/v1/transfers/:id', Transfers.update);

export default router;
