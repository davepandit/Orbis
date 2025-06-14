import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// initiate google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback route
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      // redirect the user to login page again
      // TODO - Later we can redirect the user to login screen
      // return res.redirect(process.env.FRONTEND_LOGIN_REDIRECT_URL);
      // TESTING - This is for testing because we need to redirect the user to login screen
      return res.status(500).json({
        message: `Something went wrong - ${err}`,
      });
    }

    // issuing a jwt token
    // NOTE - We can set email into the taken as well
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    // redirect the user to the home page
    // TODO - Later we can redirect the user to the dashboard
    // return res.redirect(process.env.FRONTEND_HOME_REDIRECT_URL);

    // TESTING - This is for testing only because we need to redirect the user to the home or dashboard
    res.status(200).json({
      message: "User sign in successfull with google!!!!",
      token: token, // TESTING - This is for testing only and needs to be removed later
    });
  })(req, res, next);
});

export default router;
