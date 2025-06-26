import express from "express";
// import controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  completeUserProfile,
  getMyProfile,
  getMyExtendedProfile,
} from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// NOTE - The user needs to be logged in to access the below routes
router.post("/complete-profile", validateToken, completeUserProfile);
router.get("/my-profile", validateToken, getMyProfile); // this is used during the google sign in and sign up
router.get("/my-extended-profile", validateToken, getMyExtendedProfile); // this is used during normal sign in

export default router;
