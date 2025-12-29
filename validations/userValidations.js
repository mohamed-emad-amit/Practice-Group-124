const Joi = require("joi");

// Joi.string() -> String
// Joi.boolean() -> Boolean

/**
 * {
 *      email: ""
 *      password: ""
 * }
 */

const idSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  salary: Joi.number().precision(2).positive().required(),
  role: Joi.string()
    .valid("admin", "customer", "super-admin")
    .default("customer"),
  hireDate: Joi.date().iso().less("now").required(),
});

module.exports = { createUserSchema, idSchema };
