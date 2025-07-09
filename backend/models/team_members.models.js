import mongoose from "mongoose";

const teamMembersSchema = new mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TeamMembers = mongoose.model("TeamMembers", teamMembersSchema);
export default TeamMembers;
