import paginationParse from '../utils/pagination';
import database, { Users } from '../models';

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

  try {
    const data = await Users.findAll(select);
    const { count } = await Users.findAndCountAll({ where });

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

export const get = async (req, res) => {
  res.send(true);
};

export const update = async (req, res) => {
  res.send(true);
};
