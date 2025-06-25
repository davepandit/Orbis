import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    avatar_url: {
      type: String, // this will be coming from cloudinary
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    phone_number: {
      type: String,
    },
    country: {
      type: String,
      default: "India",
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
