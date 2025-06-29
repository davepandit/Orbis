import express from "express";
import {
  createEvent,
  completeEventDetails,
  getEvents,
} from "../controllers/event.controllers.js";
import {
  validateToken,
  eventAdminCheck,
  superAdminCheck,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/create-event", validateToken, createEvent);
router.post(
  "/complete-event-details/:eventId",
  validateToken,
  eventAdminCheck,
  completeEventDetails
); // NOTE - This also needs an event admin middleware

export default router;
