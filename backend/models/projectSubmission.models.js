import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  title: { type: String, required: true },
  description: { type: String },
  repoLink: { type: String },
  demoLink: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

const ProjectSubmission = mongoose.model("ProjectSubmission", projectSchema);
export default ProjectSubmission;
