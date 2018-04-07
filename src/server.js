import express from 'express';
import routes from './routes';
import db from './models'

const app = express();

app.use(routes);

app.listen(process.env.NODE_PORT || 3000, () => {
  console.log('server on');
});
