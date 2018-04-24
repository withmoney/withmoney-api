import database, { Transfers } from '../models';
import * as Controller from './Controller';

export const list = async (req, res) => {
  try {
    const data = await Transfers.find({
      where: {},
      include: [
        {
          model: database.Accounts,
          as: 'accountFrom',
        },
        {
          model: database.Accounts,
          as: 'accountTo',
        },
      ],
    });

    res.json({
      data,
      // pagination,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const a = true;
