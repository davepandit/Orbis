import asyncHandler from "express-async-handler";
import Event from "../models/event.models.js";
import EventPeople from "../models/event_people.models.js";
import UserProfile from "../models/user_profile.models.js";
import EventTimeline from "../models/event_timeline.models.js";
import EventTheme from "../models/event_theme.models.js";
import Theme from "../models/theme.models.js";
import EventSponsors from "../models/event_sponsors.models.js";
import EventSchedule from "../models/event_schedule_items.models.js";
import Club from "../models/club.models.js";
import User from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Prize from "../models/prizes.models.js";
import Faqs from "../models/event_faqs.models.js";
import UserSocialProfiles from "../models/user_social_profiles.models.js";

//@description     Create an event
//@route           POST /api/events/create-event
//@access          Private
export const createEvent = asyncHandler(async (req, res) => {
  let { admin } = req.params;
  const requiredClub = admin.split("-")[0];

  // find the id of the club whose name is required club
  const clubId = await Club.findOne({ name: requiredClub }).select("_id");
  console.log("Club Id:", clubId);

  // create a dummy event
  const dummyEvent = new Event({
    created_by: req.user._id,
    organised_by: clubId._id,
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

//@description     Get club specific events
//@route           GET /api/events/get-club-events
//@access          Private
export const getClubEvents = asyncHandler(async (req, res) => {
  let { admin } = req.params;
  const requiredClub = admin.split("-")[0];

  // create a sort options
  let sortOptions = {
    createdAt: -1,
  };
  // get the id of the required club
  const clubId = await Club.findOne({ name: requiredClub }).select("_id");

  // get the events that are organisd by requiredClub
  const filteredEvents = await Event.find({
    organised_by: clubId._id,
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

//@description     Get all events
//@route           GET /api/events/get-event-details/:eventId
//@access          Public
export const getEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // get the event details specific to this event
  const eventDetails = await Event.findOne({ _id: eventId });

  const eventTheme = await EventTheme.findOne({ event_id: eventId });

  let found = true;

  if (!eventTheme) {
    found = false;
  }

  const theme = await Theme.findById(eventTheme.theme_id);

  // before sending the object need to send do a bit of pre-processing on the eventDetails.organised_by
  const organisingClubs = await Club.find({
    _id: { $in: eventDetails.organised_by },
  }).select("name");

  const modifiedOrganisingClubs = organisingClubs.map((club) => {
    return {
      label: club.name,
      value: club._id,
    };
  });

  return res.json({
    name: eventDetails?.name || "",
    mode: eventDetails?.mode || "",
    tagline: eventDetails?.tagline || "",
    about: eventDetails?.about || "",
    max_participants: eventDetails?.max_participants || 100,
    min_team_size: eventDetails?.min_team_size || 2,
    max_team_size: eventDetails?.max_team_size || 5,
    status: eventDetails?.status || "",
    organised_by: modifiedOrganisingClubs,
    event_visibility: eventDetails?.event_visibility || "",
    themeName: found == true ? theme.name : "",
    themeDescription: found == true ? theme.description : "",
    message: "Event details fetched successfully!!!",
  });
});

//@description     Edit basic event info events
//@route           GET /api/events/:admin/edit-basic-event-info/:eventId
//@access          Private
export const editBasicEventInfo = asyncHandler(async (req, res) => {
  const { eventId, admin } = req.params;
  const { themeName, themeDescription } = req.body;
  console.log(req.body);

  // need to do some processing with the organised by thing otherwise its fine
  const organisingClubsNames = req.body.organised_by.map((club) => club.label);

  const organisingClubsIds = await Club.find({
    name: { $in: organisingClubsNames },
  }).select("_id");

  const event = await Event.findOne({ _id: eventId });

  // check if an EventTheme already exists for this event
  const existingEventTheme = await EventTheme.findOne({ event_id: eventId });

  if (existingEventTheme) {
    // update the associated theme
    await Theme.findByIdAndUpdate(
      existingEventTheme.theme_id,
      { name: themeName, description: themeDescription },
      { new: true }
    );
  } else {
    // create a new theme
    const newTheme = new Theme({
      name: themeName,
      description: themeDescription,
    });
    const savedTheme = await newTheme.save();

    // create a new EventTheme document
    const newEventTheme = new EventTheme({
      event_id: eventId,
      theme_id: savedTheme._id,
    });
    await newEventTheme.save();
  }

  event.name = req.body.name || "";
  event.mode = req.body.mode || "";
  event.tagline = req.body.tagline;
  event.about = req.body.about;
  event.max_participants = Number(req.body.max_participants) || 100;
  event.min_team_size = Number(req.body.min_team_size) || 2;
  event.max_team_size = Number(req.body.max_team_size) || 5;
  event.event_visibility = req.body.event_visibility;
  event.organised_by = organisingClubsIds;

  await event.save();

  return res.json({
    event: event,
    message: "Event details updated successfully!!!",
  });
});

//@description     Edit event timeline
//@route           GET /api/events/:admin/edit-event-timeline/:eventId
//@access          Private
export const editEventTimeline = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const {
    timezone,
    applicationStart,
    applicationEnd,
    rsvpDeadline,
    eventStart,
    eventEnd,
  } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required!!!" });
  }

  const parseDate = (date) => (date ? new Date(date) : null);

  const timelineData = {
    event_id: eventId,
    timezone: timezone || "Asia/Kolkata",
    application_start: parseDate(applicationStart),
    application_end: parseDate(applicationEnd),
    rsvp_deadline: parseDate(rsvpDeadline),
    event_start: parseDate(eventStart),
    event_end: parseDate(eventEnd),
  };

  // check if a timeline already exists for this event
  const existingTimeline = await EventTimeline.findOne({ event_id: eventId });

  let savedTimeline;

  if (existingTimeline) {
    // update existing timeline
    existingTimeline.set(timelineData);
    savedTimeline = await existingTimeline.save();
  } else {
    // create new timeline
    const newTimeline = new EventTimeline(timelineData);
    savedTimeline = await newTimeline.save();
  }

  return res.status(200).json({
    message: "Event timeline saved successfully!!!",
    timeline: savedTimeline,
  });
});

export const getEventTimeline = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  const timeline = await EventTimeline.findOne({ event_id: eventId });

  if (!timeline) {
    return res
      .status(404)
      .json({ message: "Timeline not found for this event." });
  }

  return res.status(200).json({
    message: "Timeline fetched successfully!!!",
    timeline: timeline,
  });
});

export const editEventSchedule = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const days = req.body;

  console.log("days:", days);

  if (!eventId || !Array.isArray(days)) {
    return res.status(400).json({ message: "Invalid request format!!!" });
  }

  await EventSchedule.deleteMany({ event_id: eventId }); // i realised that i need this later while testing

  const scheduleEntries = [];

  days.forEach((day) => {
    const { date, items } = day;

    items.forEach((item) => {
      scheduleEntries.push({
        event_id: eventId,
        date: new Date(date), // ISO date string to Date object
        start_time: item.start_time,
        end_time: item.end_time,
        title: item.title,
        description: item.description || "",
      });
    });
  });

  // insert the data
  const inserted = await EventSchedule.insertMany(scheduleEntries);

  return res.status(201).json({
    message: "Event schedule updated successfully!!!",
  });
});

export const getEventSchedule = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required!!!" });
  }

  // all schedules for the event
  const scheduleItems = await EventSchedule.find({ event_id: eventId });

  // grouping the items by date
  const groupedByDate = {};

  scheduleItems.forEach((item) => {
    const dateKey = item.date.toISOString().split("T")[0]; // e.g., '2025-07-06'

    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }

    groupedByDate[dateKey].push({
      start_time: item.start_time,
      end_time: item.end_time,
      title: item.title,
      description: item.description,
    });
  });

  const response = Object.keys(groupedByDate).map((date) => ({
    date,
    items: groupedByDate[date],
  }));

  return res.status(200).json({
    schedule: response,
    message: "Event schedule fetched successfully!!!",
  });
});

export const editEventpeople = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const people = req.body;

  console.log("request body:", people);

  if (!eventId || !Array.isArray(people)) {
    return res.status(400).json({ message: "Invalid request body!!!" });
  }

  // delete previous events this will help later when the admin edits the page
  await EventPeople.deleteMany({ event_id: eventId });

  const eventPeopleToSave = [];

  for (const person of people) {
    const { username, roles } = person;

    if (!username || !Array.isArray(roles)) {
      continue;
    }

    const user = await User.findOne({ username });

    if (!user) {
      console.log(`User not found: ${username}`);
      return res
        .status(404)
        .json({ message: "Username of one of the users not found!!!" }); // or return error if strict validation is needed
    }

    eventPeopleToSave.push({
      event_id: eventId,
      user_id: user._id,
      role: roles,
    });
  }

  const savedPeople = await EventPeople.insertMany(eventPeopleToSave);

  return res.status(200).json({
    message: "Event people updated successfully!!!",
  });
});

export const getEventPeople = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required!!!" });
  }

  const people = await EventPeople.find({ event_id: eventId });

  // NOTE - async in map behaves very differently than the normal one
  const populatedPeople = await Promise.all(
    people.map(async (person) => {
      const user = await User.findById(person.user_id);
      if (!user) return null;

      return {
        username: user.username,
        roles: person.role,
      };
    })
  );

  // filter out null people if they are not found
  const filteredPeople = populatedPeople.filter(Boolean);

  return res.status(200).json({ people: filteredPeople });
});

export const editEventSponsors = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  console.log("request body:", req.body);

  let sponsorsRaw = req.body.sponsors;

  if (!Array.isArray(sponsorsRaw)) {
    sponsorsRaw = [sponsorsRaw];
  }

  // Step 1: extract sponsor metadata from req.body.sponsors (each is a JSON string)
  const sponsorDataArray = sponsorsRaw.map((sponsor) => JSON.parse(sponsor));

  // Step 2: match files by index (files are in same order)
  const files = req.files;

  if (sponsorDataArray.length !== files.length) {
    return res.status(400).json({
      message: "Mismatch between sponsor data and uploaded files!!!",
    });
  }

  const savedSponsors = [];

  for (let i = 0; i < sponsorDataArray.length; i++) {
    const sponsor = sponsorDataArray[i];
    const file = files[i];

    // Step 3: upload file to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Image upload failed!!!" });
    }

    // Step 4: save to DB
    const newSponsor = await EventSponsors.create({
      event_id: eventId,
      name: sponsor.name,
      tier: sponsor.tier,
      website_url: sponsor.website_url,
      logo_url: cloudinaryResponse.url,
    });

    savedSponsors.push(newSponsor);
  }

  return res.status(201).json({
    message: "Sponsors added successfully!!!",
    sponsors: savedSponsors,
  });
});

export const editEventPrizes = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const prizes = req.body;

  console.log("prizes: ", prizes);

  if (!Array.isArray(prizes)) {
    return res.status(400).json({ message: "Invalid data format!!!" });
  }

  // delete existing prize data got this after a lot of testing while updating the doc
  await Prize.deleteMany({ event_id: eventId });

  const createdPrizes = [];

  for (const prize of prizes) {
    const newPrize = await Prize.create({
      event_id: eventId,
      position: prize.position,
      prize_value: prize.prize_value,
    });
    createdPrizes.push(newPrize);
  }

  res.status(201).json({
    message: "Prizes saved successfully!!!",
    data: createdPrizes,
  });
});

export const getEventPrizes = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const prizes = await Prize.find({ event_id: eventId }).select(
    "position prize_value -_id"
  );

  // sort prizes by position
  const positionOrder = { first: 1, second: 2, third: 3 };
  prizes.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);

  res.status(200).json(prizes);
});

export const editEventFaqs = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const faqs = req.body;

  if (!Array.isArray(faqs)) {
    return res.status(400).json({ message: "FAQs should be an array!!!" });
  }

  // remove the previous docs, did this because this wont create duplicate copies when the user updates the faqs
  await Faqs.deleteMany({ event_id: eventId });

  const faqsWithEvent = faqs.map((faq) => ({
    ...faq,
    event_id: eventId,
  }));

  await Faqs.insertMany(faqsWithEvent);

  res.status(200).json({ message: "FAQs updated successfully!!!" });
});

export const getEventFaqs = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const faqs = await Faqs.find({ event_id: eventId }).select("question answer");

  res.status(200).json(faqs);
});

export const deleteEventAndAllData = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // delete the core event
  const deletedEvent = await Event.findByIdAndDelete(eventId);

  if (!deletedEvent) {
    return res.status(404).json({ message: "Event not found!!!" });
  }

  // delete the associated events
  await Promise.all([
    EventTimeline.deleteMany({ event_id: eventId }),
    EventSchedule.deleteMany({ event_id: eventId }),
    EventPeople.deleteMany({ event_id: eventId }),
    EventSponsors.deleteMany({ event_id: eventId }),
    Prize.deleteMany({ event_id: eventId }),
    Faqs.deleteMany({ event_id: eventId }),
  ]);

  res
    .status(200)
    .json({ message: "Event and all related data deleted successfully!!!" });
});

export const getFilteredEvents = asyncHandler(async (req, res) => {
  const { status, publication_status } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (publication_status) filters.publication_status = publication_status;

  const events = await Event.find(filters).select(
    "name tagline mode status event_visibility publication_status _id"
  );

  res.status(200).json({
    success: true,
    events,
  });
});

export const getUserEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ publication_status: "published" }).select([
    "_id",
    "name",
    "tagline",
    "mode",
    "status",
    "event_visibility",
  ]);

  // group events by status
  const upcoming = events.filter((event) => event.status === "upcoming");
  const ongoing = events.filter((event) => event.status === "ongoing");
  const ended = events.filter((event) => event.status === "ended");

  // combine in desired order
  const sortedEvents = [...upcoming, ...ongoing, ...ended];

  res.status(200).json({ events: sortedEvents });
});

export const getEventPeopleDetailedInfo = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // Find all people related to the event
  const people = await EventPeople.find({ event_id: eventId });

  const categorizedPeople = {
    "event-admin": [],
    judge: [],
    speaker: [],
  };

  for (const person of people) {
    const userId = person.user_id;

    // Fetch user profile
    const profile = await UserProfile.findOne({ user_id: userId });
    // Fetch user social links
    const social = await UserSocialProfiles.findOne({ user_id: userId });

    if (!profile) continue; // skip if no profile

    const userInfo = {
      first_name: profile.first_name || "",
      bio: profile.bio || "",
      avatar_url: profile.avatar_url || "",
      social_links: {
        github: social?.github_url || "",
        twitter: social?.twitter_url || "",
        linkedin: social?.linkedin_url || "",
      },
    };

    // Push this user into each role they belong to
    for (const role of person.role) {
      if (categorizedPeople[role]) {
        categorizedPeople[role].push(userInfo);
      }
    }
  }

  res.status(200).json({
    message: "Event people fetched successfully!",
    people: categorizedPeople,
  });
});
