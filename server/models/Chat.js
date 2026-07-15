const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    youtubeUrl: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "english",
    },

    summary: {
      type: [String],
      default: [],
    },

    transcript: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
    actionItems: {
      type: [String],
      default: [],
    },

    keyDecisions: {
      type: [String],
      default: [],
    },

    openQuestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Chat", chatSchema);
