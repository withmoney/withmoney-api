import { Accounts } from '../models';
import UserService from '../services/UserService';
import createResourceController from '../utils/createResourceController';

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

const UserController = createResourceController(UserService, {
  custom: { accounts },
});

export default UserController;
