const express = require("express");
const app=express();
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







//Route imports
const user = require("./routes/userRoutes");


app.use("/api/v1/users",user);




module.exports=app;