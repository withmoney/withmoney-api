import database, { Users, Accounts } from '../models';
import * as Controller from './Controller';

export const list = async ({ query }, res) => {
  const limit = parseInt(query.limit, 10) || 100;
  const page = parseInt(query.page, 10) || 1;
  const name = query.name || '';
  const batch = query.batch || null;

  const select = {
    limit,
    offset: parseInt(limit, 10) * (page - 1),
    order: [['id', 'DESC']],
  };
  const where = {};

  if (name.length) {
    where.name = name;
  }

  if (batch) {
    let models = batch.split(',');

    if (models.length) {
      models = models.map(model => ({
        model: database[model],
      }));
      console.log(models);
      select.include = models;
    }
  }

  return Controller.list({ query }, res, Users, {
    select,
    where,
    page,
    limit,
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
