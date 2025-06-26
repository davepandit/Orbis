import mongoose from "mongoose";

const userSocialProfilesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    github_url: {
      type: String,
    },
    twitter_url: {
      type: String,
    },
    linkedin_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserSocialProfiles = mongoose.model(
  "UserSocialProfiles",
  userSocialProfilesSchema
);
export default UserSocialProfiles;
