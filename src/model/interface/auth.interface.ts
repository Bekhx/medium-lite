import { IUserDetails } from './user.interface';
import { Post } from '../../entity/post.entity';

export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string,
  password: string
}

export interface IUserAuth extends IUserDetails, ITokenPairs {
  posts?: Post[] | []
}

export interface ITokenPairs extends IRefreshToken {
  accessToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface IJwtPayload {
  id: number;
}
