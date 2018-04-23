import { Accounts } from '../models';
import * as Controller from './Controller';

export const list = ({ query }, res) => {
  const where = {};

  return Controller.list({ query }, res, Accounts, {
    where,
  });
};

export const create = async (req, res) => {
  const {
    name,
    userId,
    type,
    initalValue,
  } = req.body;

  try {
    const entity = await Accounts.create({
      name,
      userId,
      type,
      initalValue,
    });

    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const get = async (req, res) => Controller.get(req, res, Accounts);

export const update = async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await Accounts.findById(id);

    if (req.body.userId) {
      req.body.userId = parseInt(req.body.userId, 10);
    }
    if (req.body.initalValue) {
      req.body.initalValue = parseFloat(req.body.initalValue);
    }

    const data = await entity.update(req.body);

    res.json(data.toJSON());
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const destroy = (req, res) => Controller.destroy(req, res, Accounts);
