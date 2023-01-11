import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
    NODE_ENV: joi.string().valid('dev', 'build', 'test'),
    PORT: joi.number().default(3000),
    URL_MONGODB: joi.string().required()
});