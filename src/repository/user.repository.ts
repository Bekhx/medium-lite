import { User } from '../entity/user.entity';
import { IGetAllUsersData } from '../model/interface/user.interface';

export default class UserRepository {
  static async getAllUsers(userData: IGetAllUsersData): Promise<{ rows: User[], count: number }> {
    return await User.findAndCountAll({
      limit: userData.limit,
      offset: userData.offset
    });
  }
}