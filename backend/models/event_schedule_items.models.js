// There are multiple things happening in an event right like hackathons, quizzes, talk by a leader(CEO, staff engineer) so here we will store the info about those
import mongoose from "mongoose";

const eventScheduleItemsSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    date: {
      type: Date, // only the date part matters (e.g. 2025-07-11)
      required: true,
    },
    start_time: {
      type: String, // e.g. "08:00 AM"
      required: true,
    },
    end_time: {
      type: String, // e.g. "10:00 AM"
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventSchedule = mongoose.model("EventSchedule", eventScheduleItemsSchema);
export default EventSchedule;
