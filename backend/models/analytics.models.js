import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  views: { type: Number, default: 0 },
  registrations: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
