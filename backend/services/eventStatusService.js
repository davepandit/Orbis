import Event from "../models/event.models.js";
import EventTimeline from "../models/event_timeline.models.js";
import mongoose from "mongoose";

//@description     Update event statuses based on timeline
//@route           Automated service
//@access          System
export const updateEventStatuses = async () => {
  try {
    const now = new Date();

    // Get all events with their timelines
    const events = await Event.find({}).populate("organised_by");

    for (const event of events) {
      const timeline = await EventTimeline.findOne({ event_id: event._id });

      if (!timeline) continue;

      let newStatus = event.status;

      // Check if event should be ongoing
      if (
        event.status === "upcoming" &&
        timeline.event_start &&
        now >= timeline.event_start
      ) {
        newStatus = "ongoing";
      }

      // Check if event should be ended
      if (
        (event.status === "upcoming" || event.status === "ongoing") &&
        timeline.event_end &&
        now >= timeline.event_end
      ) {
        newStatus = "ended";
      }

      // Update status if changed
      if (newStatus !== event.status) {
        await Event.findByIdAndUpdate(event._id, { status: newStatus });
        console.log(`Event ${event.name} status updated to ${newStatus}`);
      }
    }

    console.log("Event status update completed");
  } catch (error) {
    console.error("Error updating event statuses:", error);
  }
};

//@description     Get events that need status updates
//@route           GET /api/events/status-update
//@access          Public (for testing)
export const getEventsNeedingStatusUpdate = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find({}).populate("organised_by");
    const eventsNeedingUpdate = [];

    for (const event of events) {
      const timeline = await EventTimeline.findOne({ event_id: event._id });

      if (!timeline) continue;

      let shouldUpdate = false;
      let newStatus = event.status;

      // Check if event should be ongoing
      if (
        event.status === "upcoming" &&
        timeline.event_start &&
        now >= timeline.event_start
      ) {
        shouldUpdate = true;
        newStatus = "ongoing";
      }

      // Check if event should be ended
      if (
        (event.status === "upcoming" || event.status === "ongoing") &&
        timeline.event_end &&
        now >= timeline.event_end
      ) {
        shouldUpdate = true;
        newStatus = "ended";
      }

      if (shouldUpdate) {
        eventsNeedingUpdate.push({
          event: event,
          timeline: timeline,
          currentStatus: event.status,
          newStatus: newStatus,
          eventStart: timeline.event_start,
          eventEnd: timeline.event_end,
          now: now,
        });
      }
    }

    res.status(200).json({
      message: "Events needing status update",
      count: eventsNeedingUpdate.length,
      events: eventsNeedingUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking event statuses",
      error: error.message,
    });
  }
};
