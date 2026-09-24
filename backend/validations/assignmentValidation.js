import Joi from "joi";

export const assignSchema = Joi.object({
  mentorId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid mentor ID",
      "any.required": "Mentor ID is required"
    }),

  menteeId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid mentee ID",
      "any.required": "Mentee ID is required"
    })
});
