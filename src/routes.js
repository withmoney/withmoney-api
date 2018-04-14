import { Router } from 'express';
import * as Users from './controllers/Users';

const router = Router();

router.get('/', (req, res) => {
  res.send('legal');
});

router.get('/api/v1/users', Users.list);
router.post('/api/v1/users', Users.create);
router.get('/api/v1/users/:id', Users.get);
router.delete('/api/v1/users/:id', Users.destroy);
router.put('/api/v1/users/:id', Users.update);

router.get('/api/v1/users/:id/accounts', Users.accounts);

export default router;
