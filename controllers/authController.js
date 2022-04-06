const db = require('../models/index')

class AuthController{

    getLandingPageView(req,res){
        return res.render("index",{cssPath: "/css/landing.css"})
    }
    
    getLoginView(req,res){
        return res.render("login",{formCSS:true})
    }

    getSignUpView(req,res){
        return res.render("signup",{formCSS:true})
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async logIn(req,res){
        const csrfToken = req.csrfToken()
        const credenciales = req.body
        const userData = await db.User.findOne({
            where:{
                email:credenciales.email
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
                                    //Ver despues csrf token en la vista
        return res.render("login",{csrf: csrfToken})
        
    }

    async signUp(req,res){

        try{
            //try intenta ejecutar codigo que posiblemente lance una excepcion
            const newUser = await db.User.create(req.body)
            console.log(newUser)
            return res.redirect("/")
        }catch(error){
            //Entra aquí si se lanza una excepcion
            return res.render("signup")
        }
    }
}


module.exports = AuthController