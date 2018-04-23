import { Transactions } from '../models';
import * as Controller from './Controller';

export const list = ({ query }, res) => {
  const where = {};

  return Controller.list({ query }, res, Transactions, {
    where,
  });
};

export const create = async (req, res) => {
  const {
    userId,
    name,
    value,
    type,
    isPaid,
    transationDate,
  } = req.body;

  try {
    const entity = await Transactions.create({
      userId,
      name,
      value,
      type,
      isPaid,
      transationDate,
    });

    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const get = async (req, res) => Controller.get(req, res, Transactions);

export const update = async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await Transactions.findById(id);

    if (req.body.accountId) {
      req.body.accountId = parseInt(req.body.accountId, 10);
    }
    if (req.body.value) {
      req.body.value = parseFloat(req.body.value);
    }
    if (req.body.isPaid) {
      req.body.isPaid = Boolean(req.body.isPaid);
    }

    const data = await entity.update(req.body);

    const transactionUpdated = await Transactions.findById(id);

    res.json(transactionUpdated);

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const destroy = (req, res) => Controller.destroy(req, res, Transactions);
