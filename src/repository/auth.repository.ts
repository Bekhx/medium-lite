import { User } from "../entity/user.entity";
import { IUserRegistration } from "../model/interface/auth.interface";
import { IUserDetails } from "../model/interface/user.interface";

export default class AuthRepository {
  static async create(userData: IUserRegistration): Promise<IUserDetails> {
    const data = await User.create(userData);
    return {
      id: data.dataValues.id!,
      email: data.dataValues.email,
      name: data.dataValues.name
    };
  }

  static async checkUserByEmail(email: string):Promise<IUserDetails | undefined> {
    const data = await User.findOne({ where: { email } });
    if (data) {
        return  {
          id: data.dataValues.id!,
          name: data.dataValues.name,
          password: data.dataValues.password,
          email: data.dataValues.email,
        }
    } else return  undefined;
  }
}