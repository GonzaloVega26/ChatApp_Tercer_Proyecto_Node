const express = require("express")
const ChatController = require("../controllers/chatController")


const router = express.Router()

const chatController = new ChatController()

router.get("/chats", chatController.getChatView)

module.exports = router