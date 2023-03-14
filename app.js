//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet nihil, facilis eveniet mollitia cupiditate nisi tenetur aperiam, dolor soluta tempore tempora at officia hic quaerat accusantium, sequi esse? Qui dolorem placeat quidem natus nulla, libero nemo quis atque eius! Distinctio accusantium explicabo corporis numquam, laboriosam fugit est dolore voluptatem quidem ad! Quasi cupiditate qui, libero saepe quo quas unde odio delectus sint eaque, quidem veritatis accusantium, praesentium repellat laboriosam maiores non temporibus dolorem at! Recusandae, repudiandae temporibus voluptas possimus non amet! Provident ad ea libero blanditiis soluta consectetur suscipit, in, asperiores fuga eligendi eum sit sapiente sint odio ipsam nostrum!";
const aboutContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet nihil, facilis eveniet mollitia cupiditate nisi tenetur aperiam, dolor soluta tempore tempora at officia hic quaerat accusantium, sequi esse? Qui dolorem placeat quidem natus nulla, libero nemo quis atque eius! Distinctio accusantium explicabo corporis numquam, laboriosam fugit est dolore voluptatem quidem ad! Quasi cupiditate qui, libero saepe quo quas unde odio delectus sint eaque, quidem veritatis accusantium, praesentium repellat laboriosam maiores non temporibus dolorem at! Recusandae, repudiandae temporibus voluptas possimus non amet! Provident ad ea libero blanditiis soluta consectetur suscipit, in, asperiores fuga eligendi eum sit sapiente sint odio ipsam nostrum!";
const contactContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet nihil, facilis eveniet mollitia cupiditate nisi tenetur aperiam, dolor soluta tempore tempora at officia hic quaerat accusantium, sequi esse? Qui dolorem placeat quidem natus nulla, libero nemo quis atque eius! Distinctio accusantium explicabo corporis numquam, laboriosam fugit est dolore voluptatem quidem ad! Quasi cupiditate qui, libero saepe quo quas unde odio delectus sint eaque, quidem veritatis accusantium, praesentium repellat laboriosam maiores non temporibus dolorem at! Recusandae, repudiandae temporibus voluptas possimus non amet! Provident ad ea libero blanditiis soluta consectetur suscipit, in, asperiores fuga eligendi eum sit sapiente sint odio ipsam nostrum!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", { startingContent:homeStartingContent,
    posts:posts
    
  
  });


});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });


});
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });


});
app.get("/compose", function (req, res) {
  res.render("compose");


});
app.post("/compose", function (req, res) {

  const post = {
    title: req.body.inputtext,
    content: req.body.textarea
  };
  posts.push(post);
  res.redirect("/");



});
app.get("/posts/:postName", function(req, res){
  const requestedpost = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedpost = _.lowerCase(post.title);
    if(requestedpost===storedpost){
      res.render("post",{
        storedpost:storedpost,
        content:post.content



      })
    
    }
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
