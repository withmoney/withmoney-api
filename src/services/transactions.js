import axios from 'axios';

import { parseMultDate } from '../utils/parse';

const transactionsFields = {
  transationDate: 'transactionDate',
};

const getTransactions = () => parseMultDate(axios.get('http://localhost:3000/api/v1/transactions'), transactionsFields);

const getTransaction = id => parseMultDate(axios.get(`http://localhost:3000/api/v1/transactions/${id}`), transactionsFields);

export default {
  getTransactions,
  getTransaction,
};
