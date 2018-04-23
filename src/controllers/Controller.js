import paginationParse from '../utils/pagination';
import { EXCEPTION_NOT_FOUND } from '../errors';

export const list = async (req, res, Model, options) => {
  const {
    select,
    where,
    page,
    limit,
  } = options;

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
