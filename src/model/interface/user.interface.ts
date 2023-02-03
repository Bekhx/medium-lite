import { IPostAttributes } from "../../entity/post.entity";

export interface IUserDetails {
  id: number;
  name: string;
  email: string;
  posts?: IPostAttributes[] | []
  password?: string;
}

export interface IGetAllUsers {
  page: number;
  size: number;
}

export interface IGetAllUsersData {
  limit: number;
  offset: number;
}

export interface IUserId {
  id: number;
}