import { Op } from 'sequelize';
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
} from './selectorTypes';

export const dateFilter = {
  validation: () => true,
  convert: (val) => {
    if (val.indexOf(',') > -1) {
      const parts = val.split(',');
      const [start, end] = parts;
      return {
        [Op.gte]: start,
        [Op.lte]: end,
      };
    }

    return val;
  },
};

const createdAt = dateFilter;
const updated = dateFilter;

const timestamp = {
  createdAt,
  updated,
};

export const userFilters = {
  name: nameSelType,
  email: emailSelType,
  ...timestamp,
};

export const accountFilters = {
  UserId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  initalValue: valueSelType,
  ...timestamp,
};

export const transactionFilters = {
  AccountId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transationDate: dateFilter,
  ...timestamp,
};

export const transferFilters = {
  value: valueSelType,
  AccountFromId: accountFromIdSelType,
  AccountToId: accountToIdSelType,
  transferDate: dateFilter,
  ...timestamp,
};
