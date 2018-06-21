import {
  nameSelType,
  emailSelType,
  userIdSelType,
  accountIdSelType,
  accountFromIdSelType,
  accountToIdSelType,
  valueSelType,
  typeSelType,
  isPaidSelType,
  transferDateSelType,
  transationDateSelType,
} from './selectorTypes';

export const ACTIONS = ['create', 'get', 'list', 'destroy', 'update'];

export const userForm = {
  name: nameSelType,
  email: emailSelType,
};

export const accountForm = {
  userId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  initalValue: valueSelType,
};

export const transactionForm = {
  accountId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transationDate: transationDateSelType,
};

export const transferForm = {
  value: valueSelType,
  accountFromId: accountFromIdSelType,
  accountToId: accountToIdSelType,
  transferDate: transferDateSelType,
};
