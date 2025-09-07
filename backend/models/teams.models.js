import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique team names per event
teamsSchema.index({ name: 1, event_id: 1 }, { unique: true });

const Teams = mongoose.model("Teams", teamsSchema);
export default Teams;
