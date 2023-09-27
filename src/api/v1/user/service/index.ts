import User from '../schema/index';
import { UserBody } from '../interface/index'; 

class UserService {
  static async createUser(body: UserBody) {
    try {
      const newUser = new User(body);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }
}

export default UserService;


