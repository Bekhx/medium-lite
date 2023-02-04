import { User } from '../entity/user.entity';
import { IGetAllUsersData, IUsersList } from '../model/interface/user.interface';

export default class UserRepository {
  static async getAllUsers(userData: IGetAllUsersData): Promise<IUsersList> {
    const data =  await User.findAndCountAll({
      limit: userData.limit,
      offset: userData.offset
    });

    return {
      count: data.count,
      users: data.rows
    }
  }
}