import { Transfers } from '../models';
import * as Controller from './Controller';
import {
  valueSelType,
  accountFromIdSelType,
  accountToIdSelType,
  transferDateSelType,
} from '../selectorTypes';

export const list = (req, res) => Controller.list(req, res, Transfers);

export const create = (req, res) => Controller.create(req, res, Transfers, {
  value: valueSelType,
  accountFromId: accountFromIdSelType,
  accountToId: accountToIdSelType,
  transferDate: transferDateSelType,
});

export const get = async (req, res) => Controller.get(req, res, Transfers);

export const update = (req, res) => Controller.update(req, res, Transfers, {
  value: valueSelType,
  accountFromId: accountFromIdSelType,
  accountToId: accountToIdSelType,
  transferDate: transferDateSelType,
});

export const destroy = (req, res) => Controller.destroy(req, res, Transfers);
