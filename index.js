const express = require('express')
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { port, secret } = require("./config");
const session = require("express-session");
const app = express()


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

app.get("/", (req,resp)=>{
    resp.render("index")
})



app.listen(port,  () =>{
    console.log("App listening in: http://localhost:" + port);
  });