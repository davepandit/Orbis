import express from "express";
// import controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  completeUserProfile,
  getMyProfile
} from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// NOTE - The user needs to be logged in to access the below routes
router.post("/complete-profile", validateToken, completeUserProfile);
router.get('/my-profile', validateToken, getMyProfile)

export default router;
