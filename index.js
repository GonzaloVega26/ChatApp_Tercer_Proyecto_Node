const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const flash = require('connect-flash')
const { port, secret } = require("./config");
const session = require("express-session");
//const sequelize = require('./config/database')
const {sequelize} = require("./models/index")
const csrf = require('csurf')



const app = express()
/*---------APP Routes Imports---------*/
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')
const addSessionToTemplate = require('./middlewares/addSessionToTemplate')
const db = require('./models/index')

//Static Directory
app.use(express.static(path.join(__dirname,"static")))

//Middlewares
app.use(morgan("dev"))
app.use(expressLayouts)


/*---------APP Middlewares---------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Forms-encoded to JS objects
app.use(
  session({
    secret: secret, //Cookie Encoder
    resave: false, //Dont send cookie every time
    saveUninitialized: false,
  })
);
app.use(addSessionToTemplate)
//app.use(csrf()) //Despues de session
app.use(flash())

//Defining view Engine 
app.set("view engine", "ejs")
//Defining Main layout
app.set('layout', './layouts/base')

app.get("/",async (req,res)=>{
  const listOfChats = await db.User.findOne({
    where:{
      id: 1
    },
    include:
    [
      db.User.associations.idUser1,
      db.User.associations.idUser2
  ]
  })
  
  return res.render("index",{cssPath: "/css/landing.css"})
})

/*---------Routes Use---------*/
app.use("/api/auth",authRoutes)
app.use(chatRoutes)
 



app.listen(port,  () =>{
  sequelize.sync({force: false}).then(()=>{
  console.log("La db esta correcta")
})
    console.log("App listening in: http://localhost:" + port);
  });

  /*
para crear un modelo

npx sequelize-cli model:generate --name User --attributes name:string,username:string,email:string,birthday:date,profilePic:string,password:string 
  
Para crear el modelo en la base de datos
npx sequelize-cli:migrate
Para revertir la migracion
npx sequelize-cli db:migrate:undo 


Los seeders nos sirve para popular la base de datos con datos

Para generar un seeder:                Nombre de la seed
npx sequelize-cli seed:generate --name demo-user 

Para Ejecutar todas las seed:
npx sequelize-cli db:seed:all

*/