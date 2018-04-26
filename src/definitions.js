import {
  nameSelType,
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

export const userForm = {
  name: nameSelType,
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
