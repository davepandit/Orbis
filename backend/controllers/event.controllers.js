import asyncHandler from "express-async-handler";
import Event from "../models/event.models.js";
import EventPeople from "../models/event_people.models.js";
import UserProfile from "../models/user_profile.models.js";
import EventTimeline from "../models/event_timeline.models.js";
import EventTheme from "../models/event_theme.models.js";
import Theme from "../models/theme.models.js";
import EventSponsors from "../models/event_sponsors.models.js";

//@description     Create an event
//@route           POST /api/events/create-event
//@access          Private
export const createEvent = asyncHandler(async (req, res) => {
  let { admin } = req.params;
  const requiredClub = admin.split("-")[0];

  // create a dummy event
  const dummyEvent = new Event({
    created_by: req.user._id,
    organised_by: requiredClub,
  });

  await dummyEvent.save();

  // mark the user who created the event as the event admin but before that we need to fetch the bio of the user from user profile schema
  const eventAdminBio = await UserProfile.findOne({
    user_id: req.user._id,
  }).select("bio");

  const eventPeople = new EventPeople({
    event_id: dummyEvent._id,
    user_id: req.user._id,
    role: ["event-admin"],
    bio: eventAdminBio?.bio || "Bio of user is not present",
  });

  // save the event people  object
  await eventPeople.save();

  return res.status(201).json({
    dummyEvent: dummyEvent,
    message: "Dummy event created!!!",
  });
});

//@description     Complete event details
//@route           POST /api/events/complete-event-details/:eventId
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

//@description     Get all events
//@route           GET /api/events/get-all
//@access          Public
export const getEvents = asyncHandler(async (req, res) => {
  let { limit, sort } = req.query;

  // NOTE - The query parameters are tranferred as strings to the backend so we need to parse them into the required form
  limit = parseInt(limit) || 10;

  let sortOptions = {};
  if (sort == "latest") {
    sortOptions.createdAt = -1; // this will sort the events in the descending order based on the created at field
  }

  // TESTING - This is for testing only, later we need to change the publication status to published
  const events = await Event.find({ publicationStatus: "draft" })
    .sort(sortOptions)
    .limit(limit);

  // we also want the event theme and all those stuffs
  const enrichedEvents = await Promise.all(
    events?.map(async (event) => {
      const eventTheme = await EventTheme.findOne({
        event_id: event._id,
      }).populate("theme_id");

      // TODO - Here we need to send the start date such that we can display that on the card

      return {
        ...event.toObject(),
        theme: eventTheme,
      };
    })
  );

  return res.status(200).json(enrichedEvents);
});

//@description     Get all events
//@route           GET /api/events/get-club-events
//@access          Private
export const getClubEvents = asyncHandler(async (req, res) => {
  let { admin } = req.params;
  const requiredClub = admin.split("-")[0];

  // create a sort options
  let sortOptions = {
    createdAt: -1,
  };

  // get the events that are organisd by requiredClub
  const filteredEvents = await Event.find({
    organised_by: requiredClub,
  }).sort(sortOptions);

  if (filteredEvents.length == 0) {
    return res.status(404).json({
      message: `No events created by ${requiredClub}!!!`,
    });
  }

  // now need to get some info from event timeline like the start date and the end date
  // but in order to do that, need to have the ids of the filtered events
  const eventIds = filteredEvents.map((event) => event._id);

  // in order to get the filtered events, can use $in operator
  const eventTimelines = await EventTimeline.find({
    event_id: { $in: eventIds },
  }).select("event_id event_start event_end");

  const eventTimelinesMap = new Map();
  eventTimelines.forEach((eventTimeline) => {
    eventTimelinesMap.set(eventTimeline.event_id.toString(), {
      event_start: eventTimeline.event_start,
      event_end: eventTimeline.event_end,
    });
  });

  const finalEvents = filteredEvents.map((event) => {
    const eventIdStr = event._id.toString();

    const eventTimeline = eventTimelinesMap.get(eventIdStr) || {};

    return {
      _id: event._id,
      name: event?.name || "Yet to be updated",
      mode: event?.mode || "Yet to be updated",
      status: event?.status || "Yet to be updated",
      event_visibilty: event?.event_visibility || "Yet to be updated",
      event_start: eventTimeline?.event_start || "Yet to be updated",
      event_end: eventTimeline?.event_end || "Yet to be updated",
    };
  });

  return res.status(200).json({
    finalEvents: finalEvents,
    message: "Events fetched successfully!!!",
  });
});
