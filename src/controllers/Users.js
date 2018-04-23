import { Users, Accounts } from '../models';
import selector from '../utils/selector';
import * as SelType from '../selectorTypes';
import * as Controller from './Controller';

export const list = ({ query }, res) => {
  const where = selector({
    name: SelType.nameSelType,
  }, query);

  return Controller.list({ query }, res, Users, {
    where,
  });
};

export const create = async (req, res) => {
  const { name } = req.body;

  try {
    const data = await Users.create({
      name,
    });

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const get = async (req, res) => Controller.get(req, res, Users);

export const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await Users.findById(id);

    await user.update({
      name,
    });

    const userUpdated = await Users.findById(id);

    res.json(userUpdated);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const accounts = async (req, res) => {
  const { id } = req.params;

  const select = {
    include: [
      Accounts,
    ],
  };

  try {
    const user = await Users.findById(id, select);

    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const destroy = (req, res) => Controller.destroy(req, res, Users);
