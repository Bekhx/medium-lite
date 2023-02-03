import { IUserAttributes } from '../../entity/user.entity';

export interface IPost {
  id: number;
  title: string;
  content: string;
  author: IUserAttributes;
}