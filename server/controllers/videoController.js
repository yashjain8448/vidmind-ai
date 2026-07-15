const Chat = require("../models/Chat");
const Message = require("../models/Message");
const { processVideo, askQuestion } = require("../services/pythonService");
const { extractVideoId } = require("../utils/youtube");

exports.uploadYoutube = async (req, res) => {
  try {
    const { url } = req.body;
    const videoId = extractVideoId(url);

    const thumbnail = videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "";

    if (!url) {
      // if url does not exists return error message
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required",
      });
    }

    const chat = await Chat.create({
      user: req.user._id,

      youtubeUrl: url,
      thumbnail,
      status: "processing",
    });

    const aiResult = await processVideo(chat._id.toString(), url, "english");

    chat.title = aiResult.title;
    chat.summary = aiResult.summary;
    chat.transcript = aiResult.transcript;

    chat.actionItems = aiResult.action_items;
    chat.keyDecisions = aiResult.key_decisions;
    chat.openQuestions = aiResult.open_questions;

    chat.status = "completed";

    await chat.save();

    res.status(201).json({
      success: true,
      message: "Video added successfully",
      chat,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user._id,
    }).sort({ createdAt: -1 }); // get recent chats first

    res.json({
      success: true,
      chats,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // passing both user and video id to ensure that the user can only access their own videos
    const chat = await Chat.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      chat,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.chatWithVideo = async (req, res) => {
  try {
    const { question } = req.body;
    const { id } = req.params;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    await Message.create({
      chat: id,
      role: "user",
      content: question,
    });

    const aiResponse = await askQuestion(id, question);

    await Message.create({
      chat: id,
      role: "assistant",
      content: aiResponse.answer,
    });

    return res.status(200).json({
      success: true,
      answer: aiResponse.answer,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const messages = await Message.find({
      chat: id,
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
