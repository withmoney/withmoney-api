import { Users, Accounts } from '../models';
import * as Controller from './Controller';
import { nameSelType } from '../selectorTypes';

export const list = (req, res) => Controller.list(req, res, Users);

export const create = (req, res) => Controller.create(req, res, Users, {
  name: nameSelType,
});

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
