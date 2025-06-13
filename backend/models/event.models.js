import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["offline", "online"],
    },
    tagline: {
      type: String,
    },
    about: {
      type: String,
    },
    max_participants: {
      type: Number,
    },
    min_team_size: {
      type: Number,
    },
    max_team_size: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["upcoming", "ended", "ongoing"],
      default: "upcoming",
    },
    publicationStatus: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
