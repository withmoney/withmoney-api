import {
  createService,
  type,
} from 'fastexpress';
import database, { Transactions as Model } from '../models';
import { transactionFilters as filters } from '../definitionsFilters';

export const definitions = {
  UserId: type.numberType,
  AccountId: type.numberType,
  CategoryId: type.numberType,
  name: type.stringType,
  value: type.floatType,
  type: type.stringType,
  isPaid: type.boolType,
  transactionDate: type.dateType,
  createdAt: type.datetimeType,
  updatedAt: type.datetimeType,
};

export default createService(Model, {
  definitions,
  options: { filters },
  database,
});
