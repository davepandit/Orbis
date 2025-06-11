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
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          return done(null, existingUser); // sets the existingUser into the req object
        }

        // create a new user
        const newUser = await User.create({
          email: profile.emails[0].value,
          username: profile.displayName,
          password: null, // since it's a Google account
          role: "user",
          status: "active",
          provider: "google",
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
