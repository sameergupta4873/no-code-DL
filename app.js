const express = require("express");
const app=express();
const bodyParser = require("body-parser")
var cors = require('cors');
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  
  }));
  app.use(cookieParser());
  
  app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })



//Route imports
const user = require("./routes/userRoutes");
const image = require("./routes/imageRoutes")

app.use("/api/v1/users",user);
app.use("/api/v1/images",image);




module.exports=app;