import { Router } from "express";
const userRouter = Router();
import {
  validateRequest,
  signInSchema,
  signupSchema,
  profileSchema,
} from "../utils/validation.js";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";

// Correctly pass the function references
userRouter.post("/register", validateRequest(signupSchema), register);
userRouter.post("/login", validateRequest(signInSchema), login);
userRouter.post("/logout", logout);
userRouter.put("/profile", validateRequest(profileSchema), updateProfile);

export default userRouter;
