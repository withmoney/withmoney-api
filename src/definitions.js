import {
  nameSelType,
  emailSelType,
  passwordSelType,
  enabledSelType,
  userIdSelType,
  categoryIdSelType,
  accountIdSelType,
  accountFromIdSelType,
  accountToIdSelType,
  valueSelType,
  typeSelType,
  isPaidSelType,
  transferDateSelType,
  transactionDateSelType,
  createdAtSelType,
  updatedAtSelType,
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

export const transferForm = {
  UserId: userIdSelType,
  AccountFromId: accountFromIdSelType,
  AccountToId: accountToIdSelType,
  value: valueSelType,
  transferDate: transferDateSelType,
};
