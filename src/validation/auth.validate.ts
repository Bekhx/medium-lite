import * as Joi from 'joi';

const registration = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru', 'uz']}}).required(),
  password: Joi.string().min(6).max(15).required()
});

const login = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru', 'uz']}}).required(),
  password: Joi.string().min(6).max(15).required()
});

const refreshToken = Joi.object({
  refreshToken: Joi.string().required()
});

export { registration, login, refreshToken };
