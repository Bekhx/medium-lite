import {  Post } from '../entity/post.entity';
import {  IGetPostsData, IPost, IPostCreateData, IPostsList } from '../model/interface/post.interface';

export default class PostRepository {
  static async create(postData: IPostCreateData): Promise<IPost> {
    const data = await Post.create(postData);
    return data.dataValues;
  }

  static async getPosts(postData: IGetPostsData): Promise<IPostsList> {
    const data = await Post.findAndCountAll({
      limit: postData.limit,
      offset: postData.offset,
      where: {
        authorId: postData.authorId
      },
    });

    return {
      count: data.count,
      posts: data.rows
    }
  }

  static async getPost(id: number): Promise<Post | null> {
    return  await Post.findOne({
      where: { id },
    });
  }
}