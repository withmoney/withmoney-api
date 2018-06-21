import axios from 'axios';
import qs from 'qs';
import { parseMultDate } from '../utils/parse';

const userFields = {};

const parseUrlQuery = (url, query) => (
  Object.keys(query).length ? `${url}?${qs.stringify(query)}` : url
);

const getUsers = (query = {}) => parseMultDate(axios.get(parseUrlQuery('http://localhost:3000/api/v1/users', query)), userFields);

export default {
  getUsers,
};
