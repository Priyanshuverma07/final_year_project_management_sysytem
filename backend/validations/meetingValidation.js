import Joi from "joi";

export const scheduleMeetingSchema = Joi.object({
  mentorId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  menteeId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  topic: Joi.string().min(3).required(),
  meetingTime: Joi.date().iso().required(),
  meetingLink: Joi.string().uri().optional(),
  notes: Joi.string().optional()
});
