import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    mode: {
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
    publication_status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    organised_by: {
      type: [String],
      enum: ["wec", "ieee", "acm"],
    },
    event_visibility: {
      type: String,
      enum: ["internal", "external"],
      default: "external", // or "internal", depending on your preferred default
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
