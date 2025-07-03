// There are multiple things happening in an event right like hackathons, quizzes, talk by a leader(CEO, staff engineer) so here we will store the info about those
import mongoose from "mongoose";

const eventScheduleItemsSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    start_time: {
      type: Date,
    },
    end_time: {
      type: Date,
    },
    venue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventSchedule = mongoose.model("EventSchedule", eventScheduleItemsSchema);
export default EventSchedule;
