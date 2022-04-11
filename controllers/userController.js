const db = require('../models/index')

class UserController{

    async getUsersView(req,res){

        const listOfUsers = await db.User.findAll()

        return res.render("users", {cssPath: "/css/users.css", listOfUsers: listOfUsers})
    }
}


module.exports = UserController