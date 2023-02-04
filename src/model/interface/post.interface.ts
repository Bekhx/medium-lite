import {ILimitOffset, IPageSize} from "./common/pagination.interface";
import {Post} from "../../entity/post.entity";

export interface IPostCreate {
  title: string;
  content: string;
}

export interface IPostCreateData {
  title: string;
  content: string;
  authorId: number;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  updatedAt: Date
  createdAt: Date
}

export interface IGetPosts extends IPageSize {
  authorId: string;
}

export interface IGetPostsData extends ILimitOffset {
  authorId: string;
}

export  interface IPostsList {
  count: number;
  posts: Post[];
}

export interface IGetPost {
  id: string;
}
