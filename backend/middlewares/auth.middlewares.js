import User from "../models/user.models.js";
import EventPeople from "../models/event_people.models.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// This checks whether the user is a valid user ot not(like whether he has already signed up or not)
export const validateToken = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // set the user details to req object
  // NOTE - As of now i am setting the user_id, email, username to the req object we can set more details later also
  req.user = await User.findById(decodedToken.user_id).select("-password");

  next();
});

// This checks whether the user is an admin or not
export const superAdminCheck = asyncHandler(async (req, res, next) => {
  if (req.user && req.user?.role == "super-admin") {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized as super-admin" });
  }
});

// This checks whether the user is an event admin or not
export const eventAdminCheck = asyncHandler(async (req, res, next) => {
  if (req.user) {
    // make a request to event people and check the role of the user
    const eventPeople = await EventPeople.findOne({ user_id: req.user?._id });
    if (eventPeople?.role == "event-admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized as event admin!!!" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You are not signed in. Please log in to proceed!!!" });
  }
});

// This checks whether the user is a club admin or not that can be any of the admins - wec-admin, ieee-admin
export const clubAdminCheck = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const adminType = req.params.admin;

    // check whether the logged in user is an admin of the type adminType or not
    if (req.user.role.includes(adminType)) {
      // call next
      next();
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorised to access this route!!!" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You are not signed in. Please log in to proceed!!!" });
  }
});
