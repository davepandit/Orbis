import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import UserSocialProfiles from "../models/user_social_profiles.models.js";
import UserProfile from "../models/user_profile.models.js";
import UserEducation from "../models/user_education.models.js";
import UserSkills from "../models/user_skills.models.js";
import mongoose from "mongoose";
import Club from "../models/club.models.js";

//@description     Register a user
//@route           POST /api/users/register
//@access          Public

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check whether the user already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!!!");
  }

  // user does not exist, can create the user
  const user = new User({
    username: username,
    email: email,
    password: password,
  });

  await user.save();

  // after sign in we need to generate a token for the user and store it in a cookie
  // NOTE - Later we can set the email into the token as well
  const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // set the token into some cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  // send the data to the frontend
  return res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    provider: user.provider,
    message: "User sign up successful!!!",
  });
});

//@description     Login a user
//@route           POST /api/users/login
//@access          Public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  // when user is not found
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // when user is found
  else if (user && (await user.matchPassword(password))) {
    // NOTE - Later we can set the email into the token as well
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      provider: user.provider,
      message: "User logged in successfully!!!",
    });
  }
});

//@description     Logout a user
//@route           POST /api/users/logout
//@access          Private

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out successfully" });
});

//@description     Complete user profile
//@route           POST /api/users/complete-profile
//@access          Private
export const completeUserProfile = asyncHandler(async (req, res) => {
  // TODO - Avatar URL in the user_profile schema will be coming from cloudinary so we need to write a function that takes the user avatar and uploads the image to cloudinary and saves the url to the database

  // TODO - Skills and proficiency will be sent as a map from the frontend and in the backend later we need to do some sort of parsing may be loop into the map and keep on creating a document for each of the skills and filling the user id as the user who is logged in, because according to the current schema every skill of the user needs to be stored as a separate document

  // TODO - When we make the update user profile then all the form fields should be pre-fetched and filled into the form, so for that we wont be making a call to the backend, rather we need to store all the things in redux state and later fetch them from there itself, so that the user only needs to fill the fields that he wants to update

  const { userProfileInfo, userEducationInfo, userSkills, userSocialLinks } =
    req.body;

  console.log("user social links:", userSocialLinks);
  // creating the user education object
  const userEducation = new UserEducation({
    user_id: req.user._id,
    institution_name: userEducationInfo?.institution_name || "",
    degree: userEducationInfo?.degree || "",
    field_of_study: userEducationInfo?.field_of_study || "",
    graduation_year: userEducationInfo?.graduation_year,
  });

  // some pre-processing to generate the club object ids
  const clubNames = userProfileInfo.clubs.map((club) => club.label);

  const matchedClubs = await Club.find({ name: { $in: clubNames } }).select(
    "_id"
  );

  const clubObjectIds = matchedClubs.map((club) => club._id);
  // creating the user profile object
  const userProfile = new UserProfile({
    user_id: req.user._id,
    first_name: userProfileInfo?.first_name || "",
    last_name: userProfileInfo?.last_name || "",
    bio: userProfileInfo?.bio || "",
    gender: userProfileInfo?.gender || "",
    phone_number: userProfileInfo?.phone_number || "",
    city: userProfileInfo?.city || "",
    state: userProfileInfo?.state || "",
    clubs: clubObjectIds,
  });

  // creating the user's social profile object
  const userSocialProfiles = new UserSocialProfiles({
    user_id: req.user._id,
    github_url: userSocialLinks?.github_url || "",
    twitter_url: userSocialLinks?.twitter_url || "",
    linkedin_url: userSocialLinks?.linkedin_url || "",
  });

  // map over userSkills and keep on creating userSkill objects
  const skillsData = userSkills.map((skill) => ({
    user_id: req.user._id,
    skill: skill.skill,
    proficiency: skill.proficiency,
  }));

  await UserSkills.insertMany(skillsData);

  // saving the created objects to the database
  await userEducation.save();
  await userProfile.save();
  await userSocialProfiles.save();

  return res.status(200).json({
    message: "User profile updated successfully!!!",
  });
});

//@description     Get user profile
//@route           POST /api/users/my-profile
//@access          Private
export const getMyProfile = asyncHandler((req, res) => {
  return res.status(200).json({
    _id: req.user?._id,
    username: req.user?.username,
    email: req.user?.email,
    role: req.user?.role,
    provider: req.user?.provider,
  });
});

//@description     Get user extended profile
//@route           POST /api/users/my-extended-profile
//@access          Private
export const getMyExtendedProfile = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const userProfileInfo = await UserProfile.findOne({ user_id: userId })
    .select(
      "first_name last_name bio gender phone_number country city state clubs -_id"
    )
    .populate({
      path: "clubs",
      select: "_id name", // only get these from the Club model
    });

  console.log("Userprofile info:", userProfileInfo);

  let userProfileObj = userProfileInfo;

  if (userProfileInfo != null) {
    // since in the frontend we need the fields as label for the name and value for the id thats why we need to do this transformation thing here
    userProfileObj = userProfileInfo.toObject();

    // Safely transform clubs if they exist and are not empty
    if (userProfileObj.clubs && userProfileObj.clubs.length > 0) {
      userProfileObj.clubs = userProfileObj.clubs.map((club) => ({
        label: club.name,
        value: club._id.toString(),
      }));
    }
  }

  const userEducationInfo = await UserEducation.findOne({
    user_id: userId,
  }).select("institution_name degree field_of_study graduation_year -_id");
  const userSkills = await UserSkills.find({ user_id: userId }).select(
    "skill proficiency -_id"
  );
  const userSocialLinks = await UserSocialProfiles.findOne({
    user_id: userId,
  }).select("github_url twitter_url linkedin_url -_id");

  return res.status(200).json({
    userProfileInfo: userProfileObj,
    userEducationInfo: userEducationInfo,
    userSkills: userSkills,
    userSocialLinks: userSocialLinks,
  });
});

//@description     Update education info
//@route           POST /api/users/update-profile-info
//@access          Private
export const updateProfileInfo = asyncHandler(async (req, res) => {
  const user = await UserProfile.findOne({ user_id: req.user._id });

  const clubNames = req.body.clubs.map((club) => club.label);

  const matchedClubs = await Club.find({ name: { $in: clubNames } }).select(
    "_id"
  );

  const clubObjectIds = matchedClubs.map((club) => club._id);

  // TESTING - This console logs are for testing only
  // console.log("Request body :", req.body);
  // console.log("Clubs:", matchedClubs);
  // console.log("ClubobjectIds:", clubObjectIds);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.bio = req.body.bio || user.bio;
    user.gender = req.body.gender || user.gender;
    user.phone_number = req.body.phone_number || user.phone_number;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.clubs = clubObjectIds || user.clubs;
  }

  const updatedUser = await user.save();
  return res.status(200).json({
    first_name: updatedUser.first_name,
    last_name: updatedUser.last_name,
    bio: updatedUser.bio,
    gender: updatedUser.gender,
    phone_number: updatedUser.phone_number,
    city: updatedUser.city,
    state: updatedUser.state,
    clubs: req.body.clubs,
    message: "User profile updated successfully!!!",
  });
});

//@description     Update education info
//@route           POST /api/users/update-education-info
//@access          Private
export const updateEducationInfo = asyncHandler(async (req, res) => {
  const user = await UserEducation.findOne({ user_id: req.user._id });
  if (user) {
    user.institution_name = req.body.institution_name || user.institution_name;
    user.degree = req.body.degree || user.degree;
    user.field_of_study = req.body.field_of_study || user.field_of_study;
    user.graduation_year = req.body.graduation_year || user.graduation_year;
  }

  const updatedUser = await user.save();

  return res.status(200).json({
    institution_name: updatedUser.institution_name,
    degree: updatedUser.degree,
    field_of_study: updatedUser.field_of_study,
    graduation_year: updatedUser.graduation_year,
    message: "User education profile updated successfully!!!",
  });
});

//@description     Update education info
//@route           POST /api/users/update-education-info
//@access          Private
export const updateSkills = asyncHandler(async (req, res) => {
  // Note - Here i will first delete all the existing skills of the user and then insert the new skills that the user is sending me from the frotnend
  await UserSkills.deleteMany({ user_id: req.user._id });
  const skillsData = req.body?.userSkills.map((skill) => ({
    user_id: req.user._id,
    skill: skill.skill,
    proficiency: skill.proficiency,
  }));

  await UserSkills.insertMany(skillsData);

  return res.status(200).json({
    userSkills: skillsData,
    message: "User skills updated successfully!!!",
  });
});

//@description     Update social links
//@route           POST /api/users/update-social-links
//@access          Private
export const updateSocialLinks = asyncHandler(async (req, res) => {
  const user = await UserSocialProfiles.findOne({ user_id: req.user._id });
  if (user) {
    user.github_url = req.body.github_url || user.github_url;
    user.twitter_url = req.body.twitter_url || user.twitter_url;
    user.linkedin_url = req.body.linkedin_url || user.linkedin_url;
  }

  const updatedUser = await user.save();

  return res.status(200).json({
    github_url: updatedUser.github_url,
    twitter_url: updatedUser.twitter_url,
    linkedin_url: updatedUser.linkedin_url,
    message: "User social links updated successfully!!!",
  });
});

//@description     Update user roles
//@route           POST /api/users/update-user-roles
//@access          Private
export const updateUserRoles = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    return res.status(400).json({
      message: "User not found!!!",
    });
  }

  // add a new role
  const newRole = "ieee-admin";
  if (!user.role.includes(newRole)) {
    user.role.push(newRole);
    await user.save();
    return res.status(200).json({ message: "Role added successfully!!!" });
  } else {
    return res.status(200).json({
      message: "This role is already assigned to the user!!!",
    });
  }
});

//@description     Get all uses
//@route           POST /api/users/:admin/get-all-users
//@access          Private
export const getAllClubMembers = asyncHandler(async (req, res) => {
  let { admin } = req.params;
  const requiredClub = admin.split("-")[0];

  // console.log("Club name:", requiredClub);

  // return all the users to who belong to that club to the frontend

  const userProfiles = await UserProfile.find({})
    .select("user_id first_name last_name phone_number clubs")
    .populate("clubs");

  // filter the users who belong to the club as asked by the admin from the frontend
  const filteredUsers = userProfiles.filter((userProfile) =>
    userProfile.clubs.some((club) => club.name == requiredClub)
  );

  const userIds = filteredUsers.map((user) => user.user_id);

  // need to get branch, passing year
  const userEducationInfo = await UserEducation.find({
    user_id: { $in: userIds },
  }).select("user_id field_of_study graduation_year");

  // need to get the username of the user too
  const userInfo = await User.find({
    _id: { $in: userIds },
  }).select("username email role");

  // NOTE - In terminals the populated object gets collapsed🐣
  // console.log("user profile:", userProfile);

  // send a unified response such that it becomes easy for to render that in the front-end
  const educationMap = new Map();
  userEducationInfo.forEach((edu) => {
    educationMap.set(edu.user_id.toString(), {
      graduation_year: edu.graduation_year,
      field_of_study: edu.field_of_study,
    });
  });

  const userInfoMap = new Map();
  userInfo.forEach((info) => {
    userInfoMap.set(info._id.toString(), {
      username: info.username,
      email: info.email,
      role: info.role,
    });
  });

  const finalUsers = filteredUsers.map((user) => {
    const userIdStr = user.user_id.toString();

    const education = educationMap.get(userIdStr) || {};
    const basicInfo = userInfoMap.get(userIdStr) || {};

    return {
      username: basicInfo.username || null,
      role: basicInfo.role || [],
      email: basicInfo.email || null,
      first_name: user.first_name,
      phone_number: user.phone_number,
      last_name: user.last_name,
      graduation_year: education.graduation_year || null,
      field_of_study: education.field_of_study || null,
    };
  });

  return res.json({
    finalUsers: finalUsers,
    message: "Users data fetched successfully!!!",
  });
});

export const removeUserFromClub = asyncHandler(async (req, res) => {
  let { admin } = req.params;
  const requiredClub = admin.split("-")[0];
  const { username } = req.params;

  // console.log("Required club:", requiredClub);
  // console.log("Username:", username);

  // find the userid using the username
  const user = await User.findOne({ username: username }).select("_id");
  if (!user) {
    return res.status(404).json({
      message: "User not found!!!",
    });
  }
  // console.log("user:", user);

  // get the club id using the club name
  const club = await Club.findOne({ name: requiredClub }).select("_id");
  if (!club) {
    return res.status(404).json({
      message: "Club not found!!!",
    });
  }
  // console.log("club:", club);

  let userProfile = await UserProfile.findOne({ user_id: user._id });
  if (!userProfile) {
    return res.status(404).json({
      message:
        "User profile info not found, Please fill in user profile details first!!!",
    });
  }

  userProfile.clubs = userProfile.clubs.filter(
    (clubId) => clubId.toString() !== club._id.toString()
  );

  // save the updated details
  await userProfile.save();

  return res.json({
    message: "Removed user from club!!!",
  });
});

export const makeAdmin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  const { admin } = req.params;

  if (!username || !admin) {
    return res
      .status(400)
      .json({ message: "Username and clubRole are required!!!" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found!!!" });
  }

  if (!user.role.includes(admin)) {
    user.role.push(admin);
    await user.save();
  }

  res.status(200).json({ message: `${username} is now a ${admin}!!!` });
});

export const removeasAdmin = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const { admin } = req.params;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found!!!" });
  }

  user.role = user.role.filter((role) => role !== admin);

  await user.save();

  res.status(200).json({ message: "Admin role removed successfully!!!" });
});
