import express from "express";
import { validateToken, superAdminCheck } from "../middlewares/auth.middlewares.js";
import { createClub } from "../controllers/club.controllers.js";

const router = express.Router();

router.post("/create-club", validateToken, superAdminCheck, createClub) // this should be only available to the super admin

// TODO - When we will make the super admin routes then here we need to make a route that allow the super admin to update the club details 

export default router