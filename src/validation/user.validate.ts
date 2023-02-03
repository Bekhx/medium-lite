import * as Joi from 'joi';

const allUsers = Joi.object({
  page: Joi.number().integer().positive(),
  size: Joi.number().integer().positive()
});

export { allUsers };
