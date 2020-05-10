/*eslint-disable*/
const Joi = require('@hapi/joi');

const firstname = Joi.string();
const lastname= Joi.string();
const email = Joi.string();
const password = Joi.string();
const cPassword = Joi.string();

module.exports = {
  signUpUser: Joi.object({
  firstname: firstname.required().min(3),
  lastname: lastname.required().min(3),
  email: email.required(),
  password: password.required(),
  cPassword: cPassword.required(),
}),

  signInUser: Joi.object({
  email: email.required(),
  password: password.required(),
 }),

 editUser: Joi.object({
    firstname,
    lastname,
    email,
    password,
    cPassword
   }),

};
