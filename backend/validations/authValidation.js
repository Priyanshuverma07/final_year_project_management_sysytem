import Joi from "joi";
import dotenv from "dotenv";


dotenv.config();


export const registerSchema = Joi.object({
  role: Joi.string().valid("mentor", "mentee", "admin").required(),

  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().pattern(/^[0-9]{10}$/).required(),

  // MENTEE ONLY
 universityRollNo : Joi.when("role", { 
    is: "mentee",
    then: Joi.string().required(),
    otherwise: Joi.forbidden()
  }),

  department: Joi.when("role", {
    is: Joi.valid("mentee", "mentor"),
    then: Joi.string().required(),
    otherwise: Joi.forbidden()
  }),

  section: Joi.when("role", {
    is: "mentee",
    then: Joi.string().required(),
    otherwise: Joi.forbidden()
  }),

  // MENTOR ONLY
 mentee_id: Joi.forbidden(),



  // ADMIN ONLY
 adminSecret: Joi.when("role", {
  is: "admin",
  then: Joi.string().required(),
  otherwise: Joi.forbidden()
}),


  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});





