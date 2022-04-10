const db = require('../models/index')

class AuthController{

    
    
    getLoginView(req,res){
      //  const token = req.csrfToken()
        const token =" req.csrfToken()"
        return res.render("login",{cssPath:"", csrfToken:token})
    }

    getSignUpView(req,res){
       //  const token = req.csrfToken()
       const token =" req.csrfToken()"
        return res.render("signup",{cssPath: "", csrfToken:token})
    }

    async getProfileView(req,res){
        const idUser = req.session.idUser
        console.log(req.session)
        const user = await db.User.findOne({
            where: {
                id: idUser
            }
        })
        console.log(user)
        return res.render("profile", {cssPath: "", user:user})
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async logIn(req,res){
        //  const token = req.csrfToken()
        const token =" req.csrfToken()"
        const credenciales = req.body
        const userData = await db.User.findOne({
            where:{
                mail:credenciales.mail
            }
        })
        

        if(userData){
            const user = userData.dataValues
            if(user.password===credenciales.password){
                req.session.loggedIn = true
                req.session.username = user.username
                req.session.idUser = user.id
                return res.redirect("/")
            }
            
        }
        
        return res.render("login",{csrf: csrfToken})
        
    }

    async signUp(req,res){
        try{
            const data = req.body
            const newUser = await db.User.create({
                name: data.name,
                username: data.username,
                mail: data.mail,
                birthday: data.birthday,
                password: data.password

            })
            console.log(newUser)
            return res.redirect("/")
        }catch(error){
            //Entra aquí si se lanza una excepcion
            return res.render("signup")
        }
    }
}


module.exports = AuthController