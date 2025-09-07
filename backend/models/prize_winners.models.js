import mongoose from "mongoose";

const prizeWinnersSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
      required: true,
    },
    position: {
      type: String,
      enum: ["first", "second", "third"],
      required: true,
    },
    awarded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    awarded_at: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one winner per position per event
prizeWinnersSchema.index({ event_id: 1, position: 1 }, { unique: true });

// Index to prevent teams from winning multiple positions in same event
prizeWinnersSchema.index({ event_id: 1, team_id: 1 }, { unique: true });

const PrizeWinners = mongoose.model("PrizeWinners", prizeWinnersSchema);
export default PrizeWinners;
