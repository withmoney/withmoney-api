import {
  nameSelType,
  emailSelType,
  passwordSelType,
  enabledSelType,
  userIdSelType,
  categoryIdSelType,
  accountIdSelType,
  valueSelType,
  typeSelType,
  isPaidSelType,
  transactionDateSelType,
  createdAtSelType,
  updatedAtSelType,
  repeatAmount,
  repeatType,
} from './selectorTypes';

export const ACTIONS = ['create', 'get', 'list', 'destroy', 'update'];

export const userForm = {
  name: nameSelType,
  email: emailSelType,
  password: passwordSelType,
  enabled: enabledSelType,
};

export const accountForm = {
  UserId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  initalValue: valueSelType,
};

export const categoryForm = {
  UserId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
};

export const transactionForm = {
  UserId: categoryIdSelType,
  AccountId: accountIdSelType,
  CategoryId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transactionDate: transactionDateSelType,
  createdAt: createdAtSelType,
  updatedAt: updatedAtSelType,
};

export const journalForm = {
  UserId: categoryIdSelType,
  type: typeSelType,
  repeatAmount,
  repeatType,
};
