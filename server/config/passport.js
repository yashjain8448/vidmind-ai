const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: "/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        googleId: profile.id,
      });
      // Is user already exists in our database?
      if (user) {
        return done(null, user);
      }

      user = await User.create({
        googleId: profile.id,

        firstName: profile.name.givenName,

        lastName: profile.name.familyName,

        email: profile.emails[0].value,

        picture: profile.photos[0].value,
      });

      return done(null, user);
    },
  ),
);

// Serialize user to store in session: we are only storing the user ID in session
// because whole obj for so many users can be large
// we can fetch the user from DB using this ID when needed
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session: we are fetching the user from DB using the ID stored in session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});