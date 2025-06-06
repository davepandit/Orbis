// packages
import dotenv from "dotenv";
dotenv.config();
import express from "express";

// routes
import userRouter from "./routes/user.routes.js";

const app = express();

// default middlewares
app.use(express.json());

// TESTING - This needs to be removed later
app.get("/", (req, res) => {
  res.send("this is orbis");
});

// custom routes
app.use("/api/user", userRouter);

// error handling middleware
// NOTE - This middleware will be hit if anything goes wrong inside the express-async-handler

app.use((err, req, res, next) => {
  // NOTE - Here 200 is used because express by default sets the status code of responses to 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
});


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is up and running at: ${PORT}`);
});
