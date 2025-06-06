import mongoose from "mongoose";

const userSkillsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    skills: {
      type: String,
    },
    proficiency: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserSkills = mongoose.model("UserSkills", userSkillsSchema);
export default UserSkills;
