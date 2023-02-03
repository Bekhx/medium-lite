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
    if (!data) return  undefined;

    return  {
      id: data.dataValues.id!,
      name: data.dataValues.name,
      password: data.dataValues.password,
      email: data.dataValues.email,
    }
  }

  static async getUserById(id: number): Promise<IUserDetails | undefined> {
    const userData = await User.findOne({ where: { id } })
    if (!userData) return undefined;

    return {
      id: userData.dataValues.id!,
      email: userData.dataValues.email,
      name: userData.dataValues.name
    };
  }
}