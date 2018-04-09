import { Router } from 'express';
import * as Users from './controllers/Users';

const router = Router();

router.get('/', (req, res) => {
  res.send('legal');
});

router.get('/api/v1/users', Users.list);

export default router;
