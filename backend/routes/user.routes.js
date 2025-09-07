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
  updateAvatar,
  updateUserRoles,
  getAllClubMembers,
  removeUserFromClub,
  makeAdmin,
  removeasAdmin,
  getPendingMembershipRequests,
  approveMembershipRequest,
  rejectMembershipRequest,
} from "../controllers/user.controllers.js";
import {
  clubAdminCheck,
  validateToken,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// NOTE - The user needs to be logged in to access the below routes
router.post(
  "/complete-profile",
  validateToken,
  upload.single("avatar"),
  completeUserProfile
);
router.get("/my-profile", validateToken, getMyProfile); // this is used during the google sign in and sign up
router.get("/my-extended-profile", validateToken, getMyExtendedProfile); // this is used during normal sign in

// update user details
router.put("/update-profile-info", validateToken, updateProfileInfo);
router.put("/update-education-info", validateToken, updateEducationInfo);
router.put("/update-skills", validateToken, updateSkills);
router.put("/update-social-links", validateToken, updateSocialLinks);
router.post(
  "/update-avatar",
  validateToken,
  upload.single("avatar"),
  updateAvatar
);

// club-admin routes
router.get(
  "/:admin/get-all-club-members",
  validateToken,
  clubAdminCheck,
  getAllClubMembers
);
router.delete(
  "/:admin/remove-user/:username",
  validateToken,
  clubAdminCheck,
  removeUserFromClub
);

// make memeber as admin
router.put("/:admin/make-admin", validateToken, clubAdminCheck, makeAdmin);
router.put(
  "/:admin/remove-as-admin",
  validateToken,
  clubAdminCheck,
  removeasAdmin
);

// membership request routes
router.get(
  "/:admin/get-pending-requests",
  validateToken,
  clubAdminCheck,
  getPendingMembershipRequests
);
router.post(
  "/:admin/approve-request/:requestId",
  validateToken,
  clubAdminCheck,
  approveMembershipRequest
);
router.post(
  "/:admin/reject-request/:requestId",
  validateToken,
  clubAdminCheck,
  rejectMembershipRequest
);

// TESTING - The below routes are testing routes
router.patch("/update-user-roles", validateToken, updateUserRoles);
export default router;
