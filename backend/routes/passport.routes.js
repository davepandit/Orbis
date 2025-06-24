import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import base64url from "base64url";

const router = express.Router();

// initiate google login
router.get("/google", (req, res, next) => {
  const { intent } = req.query;

  // now invoke authenticate manually with the state
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: base64url(JSON.stringify(intent)), // this is the way to send custom meta data
  })(req, res, next);
});

// callback route
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      // TESTING - This is for testing because we need to redirect the user to login screen
      return res.status(500).json({
        message: info?.message || `Something went wrong - ${err}`,
      });
    }

    // TESTING - This is for testing, this gave a lot of troubles man🐣
    // console.log("use from passport:", user.message);

    // issuing a jwt token
    const token = jwt.sign({ user_id: user._doc._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    // NOTE - I figured out that we cannot use this way because from the frontend we cannot call the google sign in route using RTK query and hence we are using window.location.href and hence we cannot send a json response back
    // res.status(200).json({
    //   _id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   role: user.role,
    //   provider: user.provider,
    //   message: user.message,
    // });

    return res.redirect(`${process.env.CLIENT_URL}/google-redirect?message=${user.message}`);
  })(req, res, next);
});

export default router;
