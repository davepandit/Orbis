import asyncHandler from "express-async-handler";
import Club from "../models/club.models.js";

//@description     Create a club
//@route           POST /api/club/create-club
//@access          Private
export const createClub = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

//   create an object
  const club = new Club({
    user_id: req.user._id,
    name: name,
    description: description, // TODO - Here we need to later take the url from cloudinary and save to the database
  });

  // save to the database
  await club.save();

  return res.status(200).json({
    message: "Club created successfully!!!",
  });
});
