import mongoose from "mongoose";

const membershipRequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MembershipRequest = mongoose.model(
  "MembershipRequest",
  membershipRequestSchema
);
export default MembershipRequest;
