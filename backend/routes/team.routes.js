import express from "express";
import { validateToken } from "../middlewares/auth.middlewares.js";
import {
  createTeam,
  getUserTeamForEvent,
  joinTeam,
  getTeamDetails,
  leaveTeam,
  getEventTeams,
} from "../controllers/team.controllers.js";

const router = express.Router();

// Team creation and joining
router.post("/create-team/:eventId", validateToken, createTeam);
router.get("/get-user-team/:eventId", validateToken, getUserTeamForEvent);
router.post("/join-team", validateToken, joinTeam);

// Team management
router.get("/:teamId/details", validateToken, getTeamDetails);
router.post("/:teamId/leave", validateToken, leaveTeam);

// Public routes
router.get("/event/:eventId", getEventTeams);

export default router;
