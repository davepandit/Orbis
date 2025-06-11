import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const validateToken = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // set the user details to req object
  // NOTE - As of now i am setting the user_id, email, username to the req object we can set more details later also
  req.user = await User.findById(decodedToken.user_id).select("password");

  next();
});
