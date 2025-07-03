import express from "express";
import {
  createEvent,
  completeEventDetails,
  getEvents,
  getClubEvents,
} from "../controllers/event.controllers.js";
import {
  validateToken,
  eventAdminCheck,
  clubAdminCheck,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", getEvents);

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

export default router;
