import paginationParse from '../utils/pagination'
import { Users } from '../models'

export const list = async (req, res) => {
  const limit = 100;
  const page = 1;
  const select = {};
  const where = {};

  try {
    const data = await Users.findAll(select)
    const { count } = await Users.findAndCountAll({ where })

    const pagination = paginationParse(count, page, limit)

    res.json({
      data,
      pagination,
    })
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
};
