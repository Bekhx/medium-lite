import * as Joi from 'joi';

const registration = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru', 'uz']}}).required(),
  password: Joi.string().min(6).max(15).required()
});

export { registration };
