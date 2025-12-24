const Joi = require("joi");

// Joi.string() -> String
// Joi.boolean() -> Boolean

/**
 * {
 *      email: ""
 *      password: ""
 * }
 */

const createUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { createUserSchema };
