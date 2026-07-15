const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  authController.googleCallback
);

authRouter.get("/me", authController.getCurrentUser);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;