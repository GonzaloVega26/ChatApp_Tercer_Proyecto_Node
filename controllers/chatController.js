class ChatController{

    getChatView(req,res){
        return res.render("chats",{cssPath: "/css/chats.css"})
    }
    
}


module.exports = ChatController