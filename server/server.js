const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

connectDB(); // Connect to MongoDB

require("./config/passport");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vidmind-ai-teal.vercel.app"],
    credentials: true, // so that cookies can be sent with requests cross-origin
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/video", videoRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
