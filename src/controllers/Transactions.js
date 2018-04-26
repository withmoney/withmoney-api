import { Transactions } from '../models';
import * as Controller from './Controller';
import {
  nameSelType,
  accountIdSelType,
  valueSelType,
  typeSelType,
  isPaidSelType,
  transationDateSelType,
} from '../selectorTypes';

export const list = (req, res) => Controller.list(req, res, Transactions);

export const create = (req, res) => Controller.create(req, res, Transactions, {
  accountId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transationDate: transationDateSelType,
});

export const get = async (req, res) => Controller.get(req, res, Transactions);

export const update = (req, res) => Controller.update(req, res, Transactions, {
  accountId: accountIdSelType,
  name: nameSelType,
  value: valueSelType,
  type: typeSelType,
  isPaid: isPaidSelType,
  transationDate: transationDateSelType,
});

export const destroy = (req, res) => Controller.destroy(req, res, Transactions);
