import { type, dateFilter } from 'fastexpress';

const createdAt = dateFilter;
const updated = dateFilter;

const timestamp = {
  createdAt,
  updated,
};

export const userFilters = {
  id: type.numberType,
  name: type.stringType,
  email: type.stringType,
  ...timestamp,
};

export const accountFilters = {
  UserId: type.numberType,
  name: type.stringType,
  type: type.stringType,
  initalValue: type.floatType,
  ...timestamp,
};

export const categoryFilters = {
  UserId: type.numberType,
  name: type.stringType,
  type: type.stringType,
  ...timestamp,
};

export const transactionFilters = {
  UserId: type.numberType,
  AccountId: type.numberType,
  name: type.stringType,
  value: type.floatType,
  type: type.stringType,
  isPaid: type.boolType,
  transactionDate: dateFilter,
  ...timestamp,
};

export const journalFilters = {
  UserId: type.numberType,
  type: type.stringType,
  repeatAmount: type.numberType,
  repeatType: type.stringType,
  ...timestamp,
};
