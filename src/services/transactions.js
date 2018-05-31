import axios from 'axios';

const getTransactions = () => axios.get('http://localhost:3000/api/v1/transactions');

export default {
  getTransactions,
};
