import { IUserDetails } from "../model/interface/user.model";

export default class AuthRepository {
  static async signup(): Promise<IUserDetails> {
    return {
      id: 1,
      email: 'some@gmail.com'
    }
  }
}