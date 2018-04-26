import { Accounts } from '../models';
import * as Controller from './Controller';
import {
  nameSelType,
  userIdSelType,
  valueSelType,
  typeSelType,
} from '../selectorTypes';

export const list = (req, res) => Controller.list(req, res, Accounts);

export const create = (req, res) => Controller.create(req, res, Accounts, {
  userId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  initalValue: valueSelType,
});

export const get = async (req, res) => Controller.get(req, res, Accounts);

export const update = (req, res) => Controller.update(req, res, Accounts, {
  userId: userIdSelType,
  name: nameSelType,
  type: typeSelType,
  initalValue: valueSelType,
});

export const destroy = (req, res) => Controller.destroy(req, res, Accounts);
