const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { port, secret } = require("./config");
const session = require("express-session");
const app = express()
const sequelize = require('./config/database')

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

//Defining view Engine 
app.set("view engine", "ejs")
//Defining Main layout
app.set('layout', './layouts/base')

 app.get("/", async (req,resp)=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
    resp.render("index")
})



app.listen(port,  () =>{
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