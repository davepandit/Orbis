import mongoose from "mongoose";

const eventTimelineSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    timezone: {
      type: String,
      default: "India",
    },
    application_start: {
      type: Date,
    },
    application_end: {
      type: Date,
    },
    rsvp_deadline: {
      type: Date,
    },
    event_start: {
      type: Date,
    },
    event_end: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const EventTimeline = mongoose.model("EventTimeline", eventTimelineSchema);
export default EventTimeline;
