import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import UserSocialProfiles from "../models/user_social_profiles.models.js";
import UserProfile from "../models/user_profile.models.js";
import UserEducation from "../models/user_education.models.js";
import UserSkills from "../models/user_skills.models.js";
import mongoose from "mongoose";

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

  // creating the user education object
  const userEducation = new UserEducation({
    user_id: req.user._id,
    institution_name: userEducationInfo.institution_name,
    degree: userEducationInfo.degree,
    field_of_study: userEducationInfo.field_of_study,
    graduation_year: userEducationInfo.graduation_year,
  });

  // creating the user profile object
  const userProfile = new UserProfile({
    user_id: req.user._id,
    first_name: userProfileInfo.first_name,
    last_name: userProfileInfo.last_name,
    bio: userProfileInfo.bio,
    gender: userProfileInfo.gender,
    phone_number: userProfileInfo.phone_number,
    city: userProfileInfo.city,
    state: userProfileInfo.state,
  });

  // creating the user's social profile object
  const userSocialProfiles = new UserSocialProfiles({
    user_id: req.user._id,
    github_url: userSocialLinks.github_url,
    twitter_url: userSocialLinks.twitter_url,
    linkedin_url: userSocialLinks.linkedin_url,
  });

  // map over userSkills and keep on creating userSkill objects
  const skillsData = userSkills.map((skill) => ({
    user_id: req.user._id,
    skill: skill.name,
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

  const userProfileInfo = await UserProfile.findOne({ user_id: userId }).select(
    "first_name last_name bio gender phone_number country city state -_id"
  );
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
    userProfileInfo: userProfileInfo,
    userEducationInfo: userEducationInfo,
    userSkills: userSkills,
    userSocialLinks: userSocialLinks,
  });
});
