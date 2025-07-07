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
} from "../controllers/event.controllers.js";
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
router.get("/get-event-people/:eventId", getEventPeople);
router.get("/get-event-prizes/:eventId", getEventPrizes);

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

export default router;
