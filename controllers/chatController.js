const db = require("../models/index");
class ChatController {

  async getOneChatMessages(req, res) {
    const idConversation = req.params.id
console.log(idConversation)
    const listOfMessages = await db.Message.findAll({
      where:{
        ConversationId: idConversation
      }
    })
    return res.json(listOfMessages);
  }


  async getChatList(req, res) {
    
    const listOfChats = await db.User.findOne({
      where:{
        id: req.session.idUser
      },
      include:
      [
        db.User.associations.idUser1,
        db.User.associations.idUser2
    ]
    })
    
    var listOfValues = []
    listOfChats.idUser1.forEach(element => {
      const objeto = {
        idConversation:element.dataValues.Conversation.dataValues.id ,
        name: element.dataValues.name
      }
      listOfValues.push(objeto)
      
    });

    listOfChats.idUser2.forEach(element => {
      const objeto = {
        idConversation:element.dataValues.Conversation.dataValues.id ,
        name: element.dataValues.name
      }
      listOfValues.push(objeto)
    });

    return res.render("mychats",{
      cssPath: "/css/chats.css",
      listOfValues
    });
  }


  async getChatView(req, res) {
    console.log(req.session)
    const idConversation = req.params.id
    
    const messages = await db.Message.findAll({
      where: {
        ConversationId: idConversation
      },
    });

    return res.render("chat", {
      cssPath: "",
      messages: messages
    });
  }

  async createMessage(req, res) {
    
    const result = await db.Message.create({
      content: req.body.message,
      ConversationId: 1,
      senderId: req.session.idUser || 1,
    });

    console.log(result);
  }
}

module.exports = ChatController;
