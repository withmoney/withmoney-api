import { Users, Accounts } from '../models';
import * as Controller from './Controller';
import { userForm } from '../definitions';
import * as SelType from '../selectorTypes';

export const list = (req, res) => Controller.list(req, res, Users, {
  filter: {
    name: SelType.nameSelType,
    email: SelType.emailSelType,
  },
});

export const create = (req, res) => Controller.create(req, res, Users, userForm);

export const get = async (req, res) => Controller.get(req, res, Users);

export const update = (req, res) => Controller.update(req, res, Users, userForm);

export const accounts = UsersModel => async (req, res) => {
  const { id } = req.params;

  const select = {
    include: [
      Accounts,
    ],
  };

  try {
    const user = await UsersModel.findById(id, select);

    res.json(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const destroy = (req, res) => Controller.destroy(req, res, Users);
