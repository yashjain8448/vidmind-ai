const express = require("express");
const videoRouter = express.Router();

const videoController = require("../controllers/videoController");
const { isLoggedIn } = require("../middleware/authMiddleware");

videoRouter.post("/youtube", isLoggedIn, videoController.uploadYoutube);

videoRouter.get("/history", isLoggedIn, videoController.getHistory);

videoRouter.get("/:id/messages", isLoggedIn, videoController.getMessages);

videoRouter.get("/:id", isLoggedIn, videoController.getVideo);

videoRouter.delete("/:id", isLoggedIn, videoController.deleteVideo);

videoRouter.post("/:id/chat", isLoggedIn, videoController.chatWithVideo);

module.exports = videoRouter;
