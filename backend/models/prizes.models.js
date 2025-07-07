import mongoose from "mongoose";

const prizesSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    position: {
      type: String,
      enum: ["first", "second", "third"],
    },
    prize_value: {
      type: String, // the reason this is a string and not a number is because it is not necessary for the prize to be money only
    },
  },
  {
    timestamps: true,
  }
);

const Prize = mongoose.model("Prize", prizesSchema);
export default Prize;
