import { Router } from "express";
const userRouter = Router();
import {
  validateRequest,
  signInSchema,
  signupSchema,
  updateProfileSchema,
} from "../middlewares/validation.js";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
// Correctly pass the function references
userRouter.post(
  "/register",
  singleUpload,
  validateRequest(signupSchema),
  register
);
userRouter.post("/login", validateRequest(signInSchema), login);
userRouter.post("/logout", logout);
userRouter.put(
  "/profile",
  singleUpload,
  validateRequest(updateProfileSchema),
  isAuthenticated,

  updateProfile
);

export default userRouter;
