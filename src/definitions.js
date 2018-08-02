import {
  nameSelType,
  emailSelType,
  passwordSelType,
  enabledSelType,
  userIdSelType,
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

export const transactionForm = {
  AccountId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transactionDate: transactionDateSelType,
  createdAt: createdAtSelType,
  updatedAt: updatedAtSelType,
};

export const transferForm = {
  value: valueSelType,
  AccountFromId: accountFromIdSelType,
  AccountToId: accountToIdSelType,
  transferDate: transferDateSelType,
};
