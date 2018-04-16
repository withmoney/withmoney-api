import { Router } from 'express';
import * as Users from './controllers/Users';
import * as Accounts from './controllers/Accounts';

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

router.get('/api/v1/users/:id/accounts', Users.accounts);

// accounts

router.get('/api/v1/accounts', Accounts.list);
router.post('/api/v1/accounts', Accounts.create);
router.get('/api/v1/accounts/:id', Accounts.get);
router.delete('/api/v1/accounts/:id', Accounts.destroy);
router.put('/api/v1/accounts/:id', Accounts.update);

// router.get('/api/v1/users/:id/accounts', Accounts.accounts);

export default router;
