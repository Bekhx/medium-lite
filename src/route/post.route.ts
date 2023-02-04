import { Router } from 'express';
import IRoute from '../model/interface/common/route.interface';
import { createValidator } from 'express-joi-validation';
import authMiddleware from '../middleware/auth.middleware';
import { createPost, getPost, getUserPosts } from '../validation/post.validate';
import PostController from '../controller/post.controller';

export default class PostRoute implements IRoute {
  public router: Router;
  public validator;

  constructor() {
    this.router = Router();
    this.validator = createValidator();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/post', authMiddleware, this.validator.body(createPost), PostController.create);
    this.router.get('/post', authMiddleware, this.validator.query(getUserPosts), PostController.getUserPosts);
    this.router.get('/post/:id', authMiddleware, this.validator.params(getPost), PostController.getPost);

  }
}
