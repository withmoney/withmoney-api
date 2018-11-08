import { createController, Controller } from 'fastexpress';
import UserService from '../services/UserService';

const accounts = (req, res) => Controller.get(req, res, UserService.accounts);

const UserController = createController(UserService, {
  custom: { accounts },
});

export default UserController;
