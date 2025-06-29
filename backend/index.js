// packages
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

// middlewares
import "./middlewares/passport.middlewares.js";

// functions
import connectToDatabase from "./config/db.js";

// routes
import userRouter from "./routes/user.routes.js";
import passportRouter from "./routes/passport.routes.js";
import eventRouter from "./routes/event.routes.js";
import clubRouter from "./routes/club.routes.js";

connectToDatabase();

const app = express();

// default middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // frontend domain
    credentials: true, // because i am using cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// TESTING - This needs to be removed later
app.get("/", (req, res) => {
  res.send("this is orbis");
});

// custom routes
app.use("/api/users", userRouter);
app.use("/api/auth", passportRouter); // this specific route is for sign in with google
app.use("/api/events", eventRouter);
app.use("/api/club", clubRouter);

// error handling middleware
// NOTE - This middleware will be hit if anything goes wrong inside the express-async-handler

app.use((err, req, res, next) => {
  // NOTE - Here 200 is used because express by default sets the status code of responses to 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at: ${PORT}`);
});

// TODO - In none of the profiles i have mentioned a field as required and all, need to do that later
