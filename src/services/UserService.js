import { Users } from '../models';
import { userForm } from '../definitions';
import creatorService from '../utils/creatorService';

const UserService = creatorService(Users, { definitions: userForm });

export default UserService;
