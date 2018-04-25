import { Transfers } from '../models';
import * as Controller from './Controller';

export const list = (req, res) => Controller.list(req, res, Transfers);

export const create = async (req, res) => {
  const {
    value,
    accountFromId,
    accountToId,
    transferDate,
  } = req.body;

  try {
    const entity = await Transfers.create({
      value,
      accountFromId,
      accountToId,
      transferDate,
    });

    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};
