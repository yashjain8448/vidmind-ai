const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    picture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);