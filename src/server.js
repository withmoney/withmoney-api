import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => {
  console.log(`server on: ${port}`);
});

export default app;
