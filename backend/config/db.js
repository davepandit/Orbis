import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const connectToDatabase = asyncHandler(async () => {
  const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected at: ${connectionInstance.connection.host}`);
});

export default connectToDatabase;
