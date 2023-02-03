import { IPostAttributes } from "../../entity/post.entity";

export interface IUserDetails {
  id: number;
  name: string;
  email: string;
  posts?: IPostAttributes[] | []
  password?: string;
}

export interface IUserId {
  id: number;
}