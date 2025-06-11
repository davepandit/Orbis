import mongoose from "mongoose";

const faqsSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Faqs = mongoose.model("Faqs", faqsSchema);
export default Faqs;
