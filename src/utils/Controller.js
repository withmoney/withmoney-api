import { EXCEPTION_NOT_FOUND } from '../errors';

const list = async (req, res, service) => {
  try {
    res.json(await service(req));
  } catch (e) {
    res.status(500).send(e);
  }
};

const get = async (req, res, service) => {
  try {
    res.json(await service(req));
  } catch (e) {
    if (e.message === EXCEPTION_NOT_FOUND) {
      res.status(404).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }
};

const create = async (req, res, service) => {
  try {
    res.json(await service(req));
  } catch (e) {
    res.status(500).send(e);
  }
};

const update = async (req, res, service) => {
  try {
    res.json(await service(req));
  } catch (e) {
    res.status(500).send(e);
  }
};

const destroy = async (req, res, service) => {
  try {
    await service(req);
    res.status(204).send();
  } catch (e) {
    res.status(500).send(e);
  }
};

export default {
  list,
  create,
  get,
  update,
  destroy,
};
