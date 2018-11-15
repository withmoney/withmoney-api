import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ].join(', '));
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  // intercepts OPTIONS method
  if (req.method === 'OPTIONS') {
    // respond with 200
    res.send(200);
  } else {
    // move on
    next();
  }
});

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server on: ${port}`);
});

export default app;
