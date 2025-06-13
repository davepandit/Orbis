import asyncHandler from "express-async-handler";

//@description     Create an event
//@route           POST /api/event/create-event
//@access          Private
export const createEvent = asyncHandler(async (req, res) => {});

//@description     Complete event details
//@route           POST /api/event/complete-event-details
//@access          Private
export const completeEventDetails = asyncHandler(async (req, res) => {});
