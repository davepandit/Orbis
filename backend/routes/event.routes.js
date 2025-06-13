import express from "express";
import {
  createEvent,
  completeEventDetails,
} from "../controllers/event.controllers.js";

const router = express.Router();

router.post("/create-event", createEvent); // NOTE - This needs an event admin middleware
router.post("/complete-event-details", completeEventDetails); // NOTE - This also needs an event admin middleware

export default router;
