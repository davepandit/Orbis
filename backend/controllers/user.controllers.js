import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

//@description     Register a user
//@route           POST /api/user/register
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

  // NOTE - Password will be hashed before saving to the db
  user.save();

  // after sign in we need to generate a token for the user and store it in a cookie
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
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    message: "User created successfully!!!",
  });
});

//@description     Login a user
//@route           POST /api/user/login
//@access          Public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = User.findOne({ email: email });

  // TODO - Implement the match password function
  if (user && (await user.matchPassword(password))) {
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
      message: "User logged in successfully!!!",
    });
  }
});

//@description     Logout a user
//@route           POST /api/user/logout
//@access          Public

export const logoutUser = asyncHandler(async () => {});
