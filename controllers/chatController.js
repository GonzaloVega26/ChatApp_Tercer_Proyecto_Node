const db = require("../models/index");
class ChatController {

  async getOneChatMessages(req, res) {

    const idConversation = req.params.idConversation
    

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
        name: element.dataValues.name,
        urlPicture: element.dataValues.urlPicture,
        idUser: element.dataValues.id
      }
      listOfValues.push(objeto)
      
    });

    listOfChats.idUser2.forEach(element => {
      const objeto = {
        idConversation:element.dataValues.Conversation.dataValues.id ,
        name: element.dataValues.name,
        urlPicture: element.dataValues.urlPicture
      }
      
      listOfValues.push(objeto)
    });

    return res.render("mychats",{
      cssPath: "/css/mychats.css",
      listOfValues
    });
  }


  async getChatView(req, res) {
    
    const idConversation = req.params.idConversation
    const idReceiver = req.params.idReceiver
    
    const messages = await db.Message.findAll({
      where: {
        ConversationId: idConversation
      },
    });

    return res.render("chat", {
      cssPath: "/css/chat.css",
      messages: messages,
      idReceiver: idReceiver
    });
  }

  async createMessage(req, res) {
    
    const result = await db.Message.create({
      content: req.body.message,
      ConversationId: req.body.idConversation,
      senderId: req.session.idUser
    });

    
  }


  async createConversation(req,res){
    const idNewUser = req.params.id
    const idOwner = req.session.idUser
    const result = await db.Conversation.create({
        idUser1:idOwner,
        idUser2: idNewUser
    })
    const idConversation = result.dataValues.id
    
    return res.redirect("/mychats/"+idConversation+"/"+idNewUser)
  }
}

module.exports = ChatController;
