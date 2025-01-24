import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["leader", "member"], default: "member" },
    },
  ],
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
