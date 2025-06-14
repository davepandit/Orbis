import asyncHandler from "express-async-handler";
import Event from "../models/event.models.js";
import EventPeople from "../models/event_people.models.js";
import UserProfile from "../models/user_profile.models.js";

//@description     Create an event
//@route           POST /api/event/create-event
//@access          Private
export const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    tagline,
    about,
    max_participants,
    min_team_size,
    max_team_size,
  } = req.body;

  // create a new event
  const event = new Event({
    name: name,
    type: type,
    tagline: tagline,
    about: about,
    max_participants: max_participants,
    min_team_size: min_team_size,
    max_team_size: max_team_size,
  });

  // save the event details
  await event.save();

  // NOTE - After saving the event details to the event schema we need to save the user who created the event to the event people schema and mark him as an event admin

  // first we need to get the bio of the user
  const userProfile = await UserProfile.findOne({ user_id: req.user?._id });
  const bio = userProfile?.bio;

  const eventPeople = new EventPeople({
    event_id: event._id,
    user_id: req.user?._id,
    role: "event-admin",
    bio: bio ? bio : "", // NOTE - If the event admin changes the bio in the user profile schema then we need to change that here too

    // NOTE - If the user who is creating the event has not setup his complete profile then his bio won't be there in the database so in that case this can crash so basically that needs to be handled
  });

  // save to the database
  await eventPeople.save();

  return res.status(200).json({ message: "Event creation successful!!!" });
});

//@description     Complete event details
//@route           POST /api/event/complete-event-details
//@access          Private
export const completeEventDetails = asyncHandler(async (req, res) => {});
