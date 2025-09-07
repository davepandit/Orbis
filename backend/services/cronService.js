import cron from "node-cron";
import { updateEventStatuses } from "./eventStatusService.js";

//@description     Initialize cron jobs for automated tasks
//@access          System
export const initializeCronJobs = () => {
  // Run every hour to check and update event statuses
  cron.schedule("0 * * * *", () => {
    console.log("Running hourly event status update...");
    updateEventStatuses();
  });

  // Run every day at midnight for daily maintenance
  cron.schedule("0 0 * * *", () => {
    console.log("Running daily maintenance tasks...");
    // Add any daily maintenance tasks here
  });

  console.log("Cron jobs initialized successfully");
};

//@description     Manual trigger for event status update (for testing)
//@route           POST /api/events/manual-status-update
//@access          Private (Admin only)
export const manualStatusUpdate = async (req, res) => {
  try {
    console.log("Manual event status update triggered");
    await updateEventStatuses();

    res.status(200).json({
      message: "Event status update completed successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in manual status update:", error);
    res.status(500).json({
      message: "Error updating event statuses",
      error: error.message,
    });
  }
};
