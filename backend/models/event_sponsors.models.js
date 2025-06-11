import mongoose from "mongoose";

const eventSponsorsSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    name: {
      type: String,
    },
    tier: {
      type: String, // This can be anything from gold to silver to bronze
      enum: ["gold", "silver", "bronze"],
    },
    logo_url: {
      type: String, // TODO - This needs to come from cloudinary so uoload this asset to cloudinary first
    },
    cover_image_url: {
      type: String, // TODO - This needs to come from cloudinary so uoload this asset to cloudinary first
    },
    website_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventSponsors = mongoose.model("EventSponsors", eventSponsorsSchema);
export default EventSponsors;
