import { Request, Response } from 'express';

import UserService from '../service/index';
import createController from '../../../../utils/createController';
import { UserBody } from '../interface/index'; 

class UserController {
  static async handlecreateUser(req: Request, res: Response) {
    return createController(res, async () => {
      const userData: UserBody = req.body;
      const newUser = await UserService.createUser(userData);
      return { status: 201, data: newUser };
    });
  }

  static async handlegetAllUsers(req: Request, res: Response) {
    return createController(res, async () => {
      const users = await UserService.getAllUsers();
      return { data: users };
    });
  }
}

export default UserController;
