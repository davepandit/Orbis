import express from "express";
import { validateToken } from "../middlewares/auth.middlewares.js";
import { createTeam, getUserTeamForEvent } from "../controllers/team.controllers.js";

const router = express.Router();

router.post("/create-team/:eventId", validateToken, createTeam);
router.get("/get-user-team/:eventId", validateToken, getUserTeamForEvent);

export default router;
