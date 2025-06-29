import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    logo_url: {
      type: String, // this will come from cloudinary
    },
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);
export default Club;
