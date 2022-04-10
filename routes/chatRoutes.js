const express = require("express")
const ChatController = require("../controllers/chatController")


const router = express.Router()

const chatController = new ChatController()

router.get("/chats", chatController.getChatView)



router.post("/chat/sendMessage/:id", chatController.createMessage)


router.get("/onechat/hola", chatController.getOneChatMessages)


router.get("/mychats",chatController.getChatList)

router.get("/api/mychats/:id", chatController.getOneChatMessages)

router.get("/mychats/:id", chatController.getChatView)
module.exports = router