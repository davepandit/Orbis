import asyncHandler from "express-async-handler";
import Event from "../models/event.models.js";
import EventPeople from "../models/event_people.models.js";
import UserProfile from "../models/user_profile.models.js";
import EventTimeline from "../models/event_timeline.models.js";
import EventTheme from "../models/event_theme.models.js";
import Theme from "../models/theme.models.js";
import EventSponsors from "../models/event_sponsors.models.js";

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
    themeName,
    themeDescription,
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

  // NOTE - We first create the theme object here and them make the event theme schema
  const theme = new Theme({
    name: themeName,
    description: themeDescription,
  });

  await theme.save();

  // now we can get the theme._id
  const eventTheme = new EventTheme({
    event_id: event._id,
    theme_id: theme._id,
  });

  await eventTheme.save();

  return res.status(200).json({ message: "Event creation successful!!!" });
});

//@description     Complete event details
//@route           POST /api/event/complete-event-details/:eventId
//@access          Private
export const completeEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // check whether this event id exists or not
  const eventExists = Event.findOne({
    event_id: eventId,
    status: "upcoming",
    publicationStatus: "draft",
  });

  if (!eventExists) {
    res.status(401);
    throw new Error("No such event exists!!!");
  }

  // when event exists
  else if (eventExists) {
    const {
      timezone = "Aisa/Kolkata",
      application_start_date,
      application_start_time,
      application_end_date,
      application_end_time,
      rsvp_deadline_date,
      rsvp_deadline_time,
      event_start_date,
      event_start_time,
      event_end_date,
      event_end_time,
    } = req.body;

    // before creating the event timeline object pre-process the dates
    // NOTE- One thing the date should be sent in MM/DD/YY format and time in 24 hrs format
    // LATER - We can use the date-fns package also for some more control and flexibility

    const application_start = `${application_start_date}${application_start_time}`;
    const application_end = `${application_end_date}${application_end_time}`;
    const rsvp_deadline = `${rsvp_deadline_date}${rsvp_deadline_time}`;
    const event_start = `${event_start_date}${event_start_time}`;
    const event_end = `${event_end_date}${event_end_time}`;

    // create the event timeline object
    const eventTimeline = new EventTimeline({
      event_id: eventId,
      timezone: timezone,
      application_start: new Date(application_start),
      application_end: new Date(application_end),
      rsvp_deadline: new Date(rsvp_deadline),
      event_start: new Date(event_start),
      event_end: new Date(event_end),
    });

    // TODO - The event sponsors thing will be send as an array of objects from the front end and here i need to map through that and create a new Event Sponsors object and then save that to the database

    // TODO - The event schedule items thing will also be send as an array of objects from the front end and here i need to map through that and create a new Event Schedule Item object and then save that to the database

    // TODO - The event people thing will also be send as an array of objects from the front end and here i need to map through that and create a new Event People object and save that to the database

    // TODO - Same is the case for faqs, prizes and tracks

    await eventTimeline.save();
  }
});
