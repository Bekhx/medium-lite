import * as Joi from 'joi';

const createPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().max(15000).required()
});

const getUserPosts = Joi.object({
  authorId: Joi.number().integer().required(),
  page: Joi.number().integer().positive(),
  size: Joi.number().integer().positive()
});

const getPost = Joi.object({
  id: Joi.number().integer().required(),
});

export { createPost, getUserPosts, getPost };
