import TeamMembers from "../models/team_members.models.js";
import Teams from "../models/teams.models.js";
import asyncHandler from "express-async-handler";

export const createTeam = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { eventId } = req.params;
  const userId = req.user._id;

  // check if team name already exists
  const existingTeam = await Teams.findOne({ name });
  if (existingTeam) {
    return res.status(400).json({ message: "Team name already exists!!!" });
  }

  // create the team
  const newTeam = new Teams({
    name,
    event_id: eventId,
  });

  await newTeam.save();

  // add the creator as team admin
  const newTeamMember = new TeamMembers({
    team_id: newTeam._id,
    user_id: userId,
    role: "admin",
  });

  await newTeamMember.save();

  res.status(201).json({
    message: "Team created successfully!!!",
    team_id: newTeam._id, // this will be used as the invite code
  });
});

export const getUserTeamForEvent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  const teamMemberships = await TeamMembers.find({ user_id: userId });

  const teamIds = teamMemberships.map((member) => member.team_id);

  // find teams
  const teams = await Teams.find({
    _id: { $in: teamIds },
    event_id: eventId,
  });

  if (teams.length === 0) {
    return res.status(404).json({ message: "No team found for this event!!!" });
  }

  const team = teams[0];

  res.status(200).json({
    message: "Team fetched successfully!!!",
    team_id: team._id,
    name: team.name,
  });
});
