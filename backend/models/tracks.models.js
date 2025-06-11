import mongoose from "mongoose";

const tracksSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Tracks = mongoose.model("Tracks", tracksSchema);
export default Tracks;
