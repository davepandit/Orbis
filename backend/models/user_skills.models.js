import mongoose from "mongoose";

const userSkillsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    skill: {
      type: String,
    },
    proficiency: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserSkills = mongoose.model("UserSkills", userSkillsSchema);
export default UserSkills;
