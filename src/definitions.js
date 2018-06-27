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
  transationDate: transationDateSelType,
};

export const transferForm = {
  value: valueSelType,
  AccountFromId: accountFromIdSelType,
  AccountToId: accountToIdSelType,
  transferDate: transferDateSelType,
};
