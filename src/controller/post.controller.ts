import { IValidatedRequest } from '../model/request.model/validatedRequest.model';
import { StatusCodes } from 'http-status-codes';
import { ErrorService } from '../service/error.service';
import PostRepository from '../repository/post.repository';
import { IValidatedRequestBody } from '../model/request.model/validatedRequestBody.model';
import { IGetPost, IGetPosts, IGetPostsData, IPostCreate, IPostCreateData } from '../model/interface/post.interface';
import { IValidatedRequestQuery } from '../model/request.model/validatedRequestQuery.model';
import { IValidatedRequestParams } from '../model/request.model/validatedRequestParams.model';

export default class PostController {

  static async create(req: IValidatedRequest<IValidatedRequestBody<IPostCreate>>, res: any) {
    try {
      const readingTime = Math.round((req.body.content.length / 1500) * 100) / 100; // The average reading speed of an adult is 1500 characters per minute.
      const postData: IPostCreateData = {
        title: req.body.title,
        content: req.body.content,
        authorId: req.userId!,
        readingTime: `${readingTime} minute`
      }

      const post = await PostRepository.create(postData);

      return res.status(StatusCodes.CREATED).json(post);
    } catch (error: any) {
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

  static async getUserPosts(req: IValidatedRequest<IValidatedRequestQuery<IGetPosts>>, res: any) {
    try {
      let page: number = 0;
      if (req.query.page > 0) page = req.query.page - 1;

      let size = 10;
      if((req.query.size !== 10) && (req.query.size > 0)) size = req.query.size;

      const userPostsData: IGetPostsData = {
        limit: size,
        offset: page * size,
        authorId: req.query.authorId
      }

      const userPosts = await PostRepository.getPosts(userPostsData);

      return res.status(StatusCodes.OK).json(userPosts);
    } catch (error: any) {
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

  static async getPost(req: IValidatedRequest<IValidatedRequestParams<IGetPost>>, res: any) {
    try {
      const post = await PostRepository.getPost(parseInt(req.params.id, 10));

      return res.status(StatusCodes.OK).json(post);
    } catch (error: any) {
      return ErrorService.error(res, error, error.status, error.message);
    }
  }

}