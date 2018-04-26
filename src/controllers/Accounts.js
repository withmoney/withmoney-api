import { Accounts } from '../models';
import * as Controller from './Controller';
import * as validate from '../utils/validate';

export const list = (req, res) => Controller.list(req, res, Accounts);

export const create = (req, res) => Controller.create(req, res, Accounts, {
  userId: {
    validation: validate.number,
  },
  name: {
    validation: validate.string,
  },
  type: {
    validation: validate.string,
  },
  initalValue: {
    validation: validate.float,
  },
});

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
