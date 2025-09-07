import TeamMembers from "../models/team_members.models.js";
import Teams from "../models/teams.models.js";
import asyncHandler from "express-async-handler";
import Event from "../models/event.models.js";
import EventTimeline from "../models/event_timeline.models.js";
import mongoose from "mongoose";

export const createTeam = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { eventId } = req.params;
  const userId = req.user._id;

  // Validate event exists and is accepting registrations
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found!!!" });
  }

  // Check if event is still accepting registrations
  const now = new Date();
  const eventTimeline = await EventTimeline.findOne({ event_id: eventId });
  if (
    eventTimeline &&
    eventTimeline.application_end &&
    now > eventTimeline.application_end
  ) {
    return res.status(400).json({ message: "Event registration has ended!!!" });
  }

  // Check if user is already in a team for this event
  const existingMembership = await TeamMembers.findOne({ user_id: userId });
  if (existingMembership) {
    const existingTeam = await Teams.findById(existingMembership.team_id);
    if (existingTeam && existingTeam.event_id.toString() === eventId) {
      return res
        .status(400)
        .json({ message: "You are already in a team for this event!!!" });
    }
  }

  // Check if team name already exists for this event
  const existingTeam = await Teams.findOne({
    name,
    event_id: eventId,
  });
  if (existingTeam) {
    return res
      .status(400)
      .json({ message: "Team name already exists for this event!!!" });
  }

  // Validate team name length
  if (name.length < 3 || name.length > 50) {
    return res
      .status(400)
      .json({ message: "Team name must be between 3 and 50 characters!!!" });
  }

  // create the team
  const newTeam = new Teams({
    name,
    description: description || "",
    event_id: eventId,
    created_by: userId,
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
    team: {
      _id: newTeam._id,
      name: newTeam.name,
      description: newTeam.description,
      invite_code: newTeam._id, // this will be used as the invite code
    },
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

export const joinTeam = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const teamId = new mongoose.Types.ObjectId(req.body.team_id);

  const team = await Teams.findById(teamId);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  const event = await Event.findById(team.event_id);
  if (!event) {
    return res.status(404).json({ message: "Associated event not found" });
  }

  // Check if event is still accepting registrations
  const now = new Date();
  const eventTimeline = await EventTimeline.findOne({
    event_id: team.event_id,
  });
  if (
    eventTimeline &&
    eventTimeline.application_end &&
    now > eventTimeline.application_end
  ) {
    return res.status(400).json({ message: "Event registration has ended!!!" });
  }

  // Check if user is already in a team for this event
  const existingMembership = await TeamMembers.findOne({ user_id: userId });
  if (existingMembership) {
    const existingTeam = await Teams.findById(existingMembership.team_id);
    if (
      existingTeam &&
      existingTeam.event_id.toString() === team.event_id.toString()
    ) {
      return res
        .status(400)
        .json({ message: "You are already in a team for this event!!!" });
    }
  }

  const currentCount = await TeamMembers.countDocuments({ team_id: teamId });

  // Check team size limits (use event's team size limits)
  if (currentCount >= event.max_team_size) {
    return res.status(400).json({ message: "Team is already full" });
  }

  const alreadyMember = await TeamMembers.findOne({
    user_id: userId,
    team_id: teamId,
  });
  if (alreadyMember) {
    return res
      .status(400)
      .json({ message: "You are already a member of this team" });
  }

  const newMember = new TeamMembers({
    team_id: teamId,
    user_id: userId,
    role: "member",
  });

  await newMember.save();

  res.status(201).json({
    message: "Joined team successfully!",
    team: {
      _id: team._id,
      name: team.name,
      description: team.description,
    },
  });
});

//@description     Get team details with members
//@route           GET /api/teams/:teamId/details
//@access          Private
export const getTeamDetails = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user._id;

  const team = await Teams.findById(teamId);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  // Check if user is a member of this team
  const membership = await TeamMembers.findOne({
    team_id: teamId,
    user_id: userId,
  });
  if (!membership) {
    return res
      .status(403)
      .json({ message: "You are not a member of this team" });
  }

  // Get all team members with their details
  const members = await TeamMembers.find({ team_id: teamId }).populate({
    path: "user_id",
    select: "username email",
    populate: {
      path: "userProfile",
      model: "UserProfile",
      select: "first_name last_name avatar_url",
    },
  });

  const event = await Event.findById(team.event_id).select(
    "name max_team_size min_team_size"
  );

  res.status(200).json({
    team: {
      _id: team._id,
      name: team.name,
      description: team.description,
      created_at: team.createdAt,
      event: event,
      members: members.map((member) => ({
        _id: member._id,
        user_id: member.user_id._id,
        username: member.user_id.username,
        email: member.user_id.email,
        first_name: member.user_id.userProfile?.first_name || "",
        last_name: member.user_id.userProfile?.last_name || "",
        avatar_url: member.user_id.userProfile?.avatar_url || "",
        role: member.role,
        joined_at: member.createdAt,
      })),
    },
  });
});

//@description     Leave team
//@route           POST /api/teams/:teamId/leave
//@access          Private
export const leaveTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user._id;

  const team = await Teams.findById(teamId);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  const membership = await TeamMembers.findOne({
    team_id: teamId,
    user_id: userId,
  });
  if (!membership) {
    return res
      .status(400)
      .json({ message: "You are not a member of this team" });
  }

  // Check if user is the team admin
  if (membership.role === "admin") {
    const memberCount = await TeamMembers.countDocuments({ team_id: teamId });
    if (memberCount > 1) {
      return res.status(400).json({
        message:
          "Team admin cannot leave if there are other members. Transfer admin role first.",
      });
    }
  }

  await TeamMembers.findByIdAndDelete(membership._id);

  // If no members left, delete the team
  const remainingMembers = await TeamMembers.countDocuments({
    team_id: teamId,
  });
  if (remainingMembers === 0) {
    await Teams.findByIdAndDelete(teamId);
  }

  res.status(200).json({ message: "Left team successfully" });
});

//@description     Get all teams for an event
//@route           GET /api/teams/event/:eventId
//@access          Public
export const getEventTeams = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const teams = await Teams.find({ event_id: eventId })
    .select("name description createdAt")
    .sort({ createdAt: -1 });

  // Get member count for each team
  const teamsWithMemberCount = await Promise.all(
    teams.map(async (team) => {
      const memberCount = await TeamMembers.countDocuments({
        team_id: team._id,
      });
      return {
        _id: team._id,
        name: team.name,
        description: team.description,
        member_count: memberCount,
        max_size: event.max_team_size,
        created_at: team.createdAt,
      };
    })
  );

  res.status(200).json({
    teams: teamsWithMemberCount,
    event: {
      name: event.name,
      min_team_size: event.min_team_size,
      max_team_size: event.max_team_size,
    },
  });
});
