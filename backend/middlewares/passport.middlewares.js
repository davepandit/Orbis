import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.models.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, //  required to access req because passport donot send the req to the middleware
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const encodedState = req.query.state;
        const intent = JSON.parse(
          Buffer.from(encodedState, "base64url").toString()
        );

        // TESTING - This is for testing only and needs to be removed later
        // console.log("request query:", req.query);
        // console.log("intent from middleware:", intent);

        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (intent === "signup") {
          if (existingUser) {
            // prevent sign up
            return done(null, false, { message: "User already exists" });
          }

          const newUser = new User({
            email: profile.emails[0].value,
            username: profile.displayName,
            password: null,
            role: "user",
            status: "active",
            provider: "google",
          });

          await newUser.save();

          return done(null, {
            ...newUser,
            message: "User sign up successful!!!",
          });
        } else if (intent === "login") {
          if (!existingUser) {
            // prevent login if user does not exist
            return done(null, false, {
              message: "User not found. Please sign up first.",
            });
          }

          return done(null, {
            ...existingUser,
            message: "User logged in successfully!!!",
          });
        }

        return done(null, false, { message: "Unknown intent" });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
