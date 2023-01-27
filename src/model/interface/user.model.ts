import { IPost } from "./post.model";

export interface IUser extends IUserDetails {
  password: number;
  posts?: IPost[];
}

export interface IUserDetails {
  id: number,
  email: string
}

export interface IExists {
  exists: boolean
}

export interface IUserId {
  id: number
}