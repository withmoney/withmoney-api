import paginationParse from '../utils/pagination';
import database, { Accounts } from '../models';
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
      select.include = models;
    }
  }

  try {
    let data = await Accounts.findAll(select);
    const { count } = await Accounts.findAndCountAll({ where });

    data = data.map(a => a.toJSON());

    const pagination = paginationParse(count, page, limit);

    res.json({
      data,
      pagination,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
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
