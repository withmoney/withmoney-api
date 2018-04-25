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

export const get = async (req, res) => Controller.get(req, res, Transfers);

export const update = async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await Transfers.findById(id);

    if (req.body.accountFromId) {
      req.body.accountFromId = parseInt(req.body.accountFromId, 10);
    }
    if (req.body.accountToId) {
      req.body.accountToId = parseInt(req.body.accountToId, 10);
    }
    if (req.body.value) {
      req.body.value = parseFloat(req.body.value);
    }
    if (req.body.transferDate) {
      req.body.transferDate = req.body.transferDate;
    }

    await entity.update(req.body);

    const transferUpdated = await Transfers.findById(id);

    res.json(transferUpdated);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const destroy = (req, res) => Controller.destroy(req, res, Transfers);
