import mongoose from "mongoose";

const userEducationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    institution_name: {
      type: String,
    },
    degree: {
      type: String,
    },
    field_of_study: {
      type: String,
    },
    graduation_year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserEducation = mongoose.model("UserEducation", userEducationSchema);
export default UserEducation;
