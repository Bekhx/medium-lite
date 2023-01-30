import { IUserDetails } from './user.model';
import { IPost } from './post.model';

export interface IUserRegistration {
  email: string;
  password: string;
}

export interface ILogin {
  email: string,
  password: string
}

export interface IUserAuth extends IUserDetails, ITokenPairs {
  posts?: IPost[] | []
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
