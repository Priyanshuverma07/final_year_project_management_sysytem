import Joi from "joi";

// 🧑‍🎓 Mentee gives feedback
export const feedbackSchema = Joi.object({
  mentorId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid mentor ID",
      "any.required": "Mentor ID is required"
    }),

  subject: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Subject is required"
    }),

  message: Joi.string()
    .min(5)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Message is required"
    }),

  rating: Joi.number()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": "Rating must be a number",
      "number.min": "Minimum rating is 1",
      "number.max": "Maximum rating is 5"
    })
});


// 👨‍🏫 Mentor reply (text only)
export const mentorReplySchema = Joi.object({
  reply: Joi.string()
    .min(2)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Reply message is required"
    })
});
