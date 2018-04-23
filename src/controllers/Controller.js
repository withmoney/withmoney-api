import paginationParse from '../utils/pagination';
import database from '../models';
import selector from '../utils/selector';
import * as SelType from '../selectorTypes';
import { EXCEPTION_NOT_FOUND } from '../errors';

const listDefaultOptions = {
  where: {},
};
export const list = async ({ query }, res, Model, options = listDefaultOptions) => {
  const {
    where,
  } = options;

  const {
    limit,
    page,
    batch,
  } = selector({
    name: SelType.nameSelType,
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    batch: SelType.batchSelType,
  }, query);

  const select = {
    limit,
    offset: parseInt(limit, 10) * (page - 1),
    order: [['id', 'DESC']],
  };

  if (where !== null) {
    select.where = where;
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
    const data = await Model.findAll(select);
    const { count } = await Model.findAndCountAll({ where });
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

export const get = async (req, res, Model) => {
  const { id } = req.params;

  try {
    const entity = await Model.findById(id);

    if (!entity) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    res.json(entity);
  } catch (e) {
    if (e.message === EXCEPTION_NOT_FOUND) {
      res.status(404).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }
};

export const destroy = async (req, res, Model) => {
  const { id } = req.params;

  try {
    await Model.destroy({
      where: { id },
    });

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};
