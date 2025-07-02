import express from "express";
// import controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  completeUserProfile,
  getMyProfile,
  getMyExtendedProfile,
  updateEducationInfo,
  updateProfileInfo,
  updateSkills,
  updateSocialLinks,
  updateUserRoles,
  getAllClubMembers,
  removeUserFromClub
} from "../controllers/user.controllers.js";
import {
  clubAdminCheck,
  validateToken,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// NOTE - The user needs to be logged in to access the below routes
router.post("/complete-profile", validateToken, completeUserProfile);
router.get("/my-profile", validateToken, getMyProfile); // this is used during the google sign in and sign up
router.get("/my-extended-profile", validateToken, getMyExtendedProfile); // this is used during normal sign in

// update user details
router.put("/update-profile-info", validateToken, updateProfileInfo);
router.put("/update-education-info", validateToken, updateEducationInfo);
router.put("/update-skills", validateToken, updateSkills);
router.put("/update-social-links", validateToken, updateSocialLinks);

// club-admin routes
router.get(
  "/:admin/get-all-club-members",
  validateToken,
  clubAdminCheck,
  getAllClubMembers
);
router.delete("/:admin/remove-user/:username", validateToken, clubAdminCheck, removeUserFromClub)

// TESTING - The below routes are testing routes
router.patch("/update-user-roles", validateToken, updateUserRoles);
export default router;
