const express = require("express")
const ChatController = require("../controllers/chatController")


const router = express.Router()

const chatController = new ChatController()

router.get("/chats", chatController.getChatView)



router.post("/chat/sendMessage/:id", chatController.createMessage)


router.get("/onechat/hola", chatController.getOneChatMessages)


router.get("/mychats",chatController.getChatList)

router.get("/api/mychats/:idConversation", chatController.getOneChatMessages)

router.get("/mychats/:idConversation/:idReceiver", chatController.getChatView)

router.get("/chats/create-chat/:id", chatController.createConversation)

module.exports = router