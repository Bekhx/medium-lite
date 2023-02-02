import { IUser } from "./user.interface";

export interface IPost {
  id: number;
  title: string;
  content: string;
  author: IUser;
}