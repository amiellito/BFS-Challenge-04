const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.listen(3000, function(){
  console.log("Listen port 3000")
});