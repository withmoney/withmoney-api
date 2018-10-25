import { createController } from 'fastexpress';
import { Accounts } from '../models';
import UserService from '../services/UserService';

const accounts = UsersModel => async (req, res) => {
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

const UserController = createController(UserService, {
  custom: { accounts },
  only: ['get', 'update', 'create'],
});

export default UserController;
