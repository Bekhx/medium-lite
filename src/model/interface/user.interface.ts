import { ILimitOffset, IPageSize } from './common/pagination.interface';
import { User } from '../../entity/user.entity';
import { Post } from '../../entity/post.entity';

export interface IUserDetails {
  id: number;
  name: string;
  email: string;
  posts?: Post[] | []
  password?: string;
}

export interface IGetAllUsers extends IPageSize {}

export interface IGetAllUsersData extends ILimitOffset {}

export interface IUserId {
  id: number;
}

export interface IUsersList {
  count: number;
  users: User[];
}