import express from "express";
import { body } from "express-validator";
import { register, login,logout} from "../controllers/authController.js";
import { registerSchema } from "../validations/authValidation.js";
import { validate } from "../middleware/validate.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    validate(registerSchema),
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("phoneNo").notEmpty(),
    body("role").isIn(["mentee", "mentor", "admin"]),
  ],
  register
);

router.post("/login", [body("email").isEmail()], login);

router.post("/logout", auth, logout);

export default router;
