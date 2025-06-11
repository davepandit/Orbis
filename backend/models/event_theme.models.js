import mongoose from "mongoose";

const eventThemeSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    theme_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
    },
  },
  {
    timestamps: true,
  }
);

const EventTheme = mongoose.model("EventTheme", eventThemeSchema);
export default EventTheme;
