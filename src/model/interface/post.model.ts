import { IUser } from "./user.model";

export interface IPost {
  id: number;
  title: string;
  content: string;
  author: IUser;
}