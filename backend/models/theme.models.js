import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Theme = mongoose.model("Theme", themeSchema);
export default Theme;
