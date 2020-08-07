const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


mongoose.connect("mongodb://localhost:27017/catvoteDB", {
  useNewUrlParser:true, 
  useUnifiedTopology:true
}).then(()=> {
  console.log("Connected to the database");
}).catch(err => {
  console.log("Error:" + err.message);
});

const catSchema = {
  url: String,
  vote: {type: Number, default: 0}
};

const Cat = mongoose.model("Image", catSchema);


/////////////////////////ROUTES////////////////////////

app.get("/", function(req, res){
  Cat.find({}, function(err, foundCat){
    if(!err){
      const catImage = foundCat[Math.floor(Math.random() * foundCat.length)];
      const catUpVote = foundCat.filter(cat => cat.vote === 1);
      const catDownVote = foundCat.filter(cat => cat.vote === -1);
      res.render('index', {catImage, catUpVote, catDownVote});
    } else {
      console.log(err);
    }
  });
});

/////////////////////////ADD NEW CATS////////////////////////

app.post("/", function(req, res){
  const newCatImage = new Cat({
    url: req.body.catUrl.replace(/['"]+/g, '' )
  });

  var newCat = newCatImage.url
  
  newCatImage.save(function(err){
    if(!err){
      res.render('success', {newCat:newCat});
    } else {
      res.send(err)
    }
  });
});


/////////////////////////VOTES////////////////////////

//UPDATE VOTE VALUE//


app.patch("/upvote/:id", function(req, res){
	Cat.findByIdAndUpdate(req.params.id, {vote: 1} , {new: true}, function(err, updatedCat){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
})

app.patch("/downvote/:id", function(req, res){
	Cat.findByIdAndUpdate(req.params.id, {vote: -1} , {new: true}, function(err, updatedCat){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
})

app.listen(3000, function(){
  console.log("Listen port 3000")
});