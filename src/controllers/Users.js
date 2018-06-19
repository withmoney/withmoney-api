import { Accounts } from '../models';
import UserService from '../services/UserService';
import creatorController from '../utils/creatorController';

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

// const list = (req, res) => Controller.list(req, res, Users, {
//   filter: {
//     name: SelType.nameSelType,
//     email: SelType.emailSelType,
//   },
// });

const UserController = creatorController(UserService, {
  custom: { accounts },
});

export default UserController;
