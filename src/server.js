import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => {
  console.log(`server on: ${port}`);
});
