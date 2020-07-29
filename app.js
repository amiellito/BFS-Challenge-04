const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/catvoteDB", {useNewParser:true, useUnifiedTopology:true});

const catSchema = {
  user_id: String,
  url: String,
  vote: Number
};

const Cat = mongoose.model("Image", catSchema);


var catArr = [] //push voted cat images here. 

//loop through catArr and display cat images

/////////////////////////ROUTES////////////////////////

app.get("/", function(req, res){
  Cat.find(function(err, foundCat){
    if(!err){
      const catImage = foundCat[Math.floor(Math.random() * foundCat.length)].url;
      res.render('index', {catImage:catImage});
    } else {
      console.log(err);
    }
  });
});




app.listen(3000, function(){
  console.log("Listen port 3000")
});