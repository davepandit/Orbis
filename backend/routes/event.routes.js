import express from "express";
import {
  createEvent,
  completeEventDetails,
  getAllEvents,
} from "../controllers/event.controllers.js";
import {
  validateToken,
  eventAdminCheck,
  adminCheck,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/create-event", validateToken, createEvent);
router.post(
  "/complete-event-details/:eventId",
  validateToken,
  eventAdminCheck,
  completeEventDetails
); // NOTE - This also needs an event admin middleware

export default router;
