import { Transactions } from '../models';
import * as Controller from './Controller';
import * as validate from '../utils/validate';

export const list = (req, res) => Controller.list(req, res, Transactions);

export const create = (req, res) => Controller.create(req, res, Transactions, {
  userId: {
    validation: validate.number,
  },
  name: {
    validation: validate.string,
  },
  value: {
    validation: validate.float,
  },
  type: {
    validation: validate.string,
  },
  isPaid: {
    validation: validate.bool,
  },
  transationDate: {
    validation: validate.string,
  },
});

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

    await entity.update(req.body);

    const transactionUpdated = await Transactions.findById(id);

    res.json(transactionUpdated);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const destroy = (req, res) => Controller.destroy(req, res, Transactions);
