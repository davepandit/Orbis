import express from "express";
import {
  createEvent,
  completeEventDetails,
  getEvents,
  getClubEvents,
  getEventDetails,
  editBasicEventInfo,
  editEventTimeline,
  getEventTimeline,
  editEventSchedule,
  getEventSchedule,
  editEventpeople,
  getEventPeople,
  editEventSponsors,
  editEventPrizes,
  getEventPrizes,
  editEventFaqs,
  getEventFaqs,
  deleteEventAndAllData,
  getFilteredEvents,
  getUserEvents,
  getEventPeopleDetailedInfo,
  getEventSponsors,
  markPrizeWinner,
  getPrizeWinners,
  removePrizeWinner,
  getEligibleTeams,
} from "../controllers/event.controllers.js";
import { getEventsNeedingStatusUpdate } from "../services/eventStatusService.js";
import { manualStatusUpdate } from "../services/cronService.js";
import {
  validateToken,
  eventAdminCheck,
  clubAdminCheck,
} from "../middlewares/auth.middlewares.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/get-event-details/:eventId", getEventDetails);
router.get("/get-event-timeline/:eventId", getEventTimeline);
router.get("/get-event-schedule/:eventId", getEventSchedule);
router.get(
  "/get-event-people-detailed-info/:eventId",
  getEventPeopleDetailedInfo
);
router.get("/get-event-people/:eventId", getEventPeople);
router.get("/get-event-prizes/:eventId", getEventPrizes);
router.get("/get-event-faqs/:eventId", getEventFaqs);
router.get("/get-event-sponsors/:eventId", getEventSponsors);
router.get("/get-prize-winners/:eventId", getPrizeWinners);

// getting the home page events that are upcoming and are marked as published
router.get("/get-filtered-events", getFilteredEvents);

// get all the events for the users to see whether ended, ongoing or upcoming
router.get("/get-user-events", getUserEvents);

// club admin routes
router.post("/:admin/create-event", validateToken, clubAdminCheck, createEvent);
router.get(
  "/:admin/get-club-events",
  validateToken,
  clubAdminCheck,
  getClubEvents
);
router.post(
  "/complete-event-details/:eventId",
  validateToken,
  eventAdminCheck,
  completeEventDetails
); // NOTE - This also needs an event admin middleware
router.post(
  "/:admin/edit-basic-event-info/:eventId",
  validateToken,
  clubAdminCheck,
  editBasicEventInfo
);
router.post(
  "/:admin/edit-event-timeline/:eventId",
  validateToken,
  clubAdminCheck,
  editEventTimeline
);
router.post(
  "/:admin/edit-event-schedule/:eventId",
  validateToken,
  clubAdminCheck,
  editEventSchedule
);
router.post(
  "/:admin/edit-event-people/:eventId",
  validateToken,
  clubAdminCheck,
  editEventpeople
);

router.post(
  "/:admin/edit-event-sponsors/:eventId",
  validateToken,
  clubAdminCheck,
  upload.any(),
  editEventSponsors
);

router.post(
  "/:admin/edit-event-prizes/:eventId",
  validateToken,
  clubAdminCheck,
  editEventPrizes
);

router.post(
  "/:admin/edit-event-faqs/:eventId",
  validateToken,
  clubAdminCheck,
  editEventFaqs
);

router.delete(
  "/:admin/delete-event/:eventId",
  validateToken,
  clubAdminCheck,
  deleteEventAndAllData
);

// Prize winner management routes
router.get(
  "/:admin/get-eligible-teams/:eventId",
  validateToken,
  clubAdminCheck,
  getEligibleTeams
);
router.post(
  "/:admin/mark-prize-winner/:eventId",
  validateToken,
  clubAdminCheck,
  markPrizeWinner
);
router.delete(
  "/:admin/remove-prize-winner/:eventId/:winnerId",
  validateToken,
  clubAdminCheck,
  removePrizeWinner
);

// Event status automation routes
router.get("/status-update", getEventsNeedingStatusUpdate);
router.post("/manual-status-update", validateToken, manualStatusUpdate);

export default router;
