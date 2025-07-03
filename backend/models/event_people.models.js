// this contains the info about the judges, speakers and those kind of people related to an event
import mongoose from "mongoose";

const eventPeopleSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: [String], // Array of strings
      eum: ["event-admin", "judge", "speaker"],
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventPeople = mongoose.model("EventPeople", eventPeopleSchema);
export default EventPeople;
