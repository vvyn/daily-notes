//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const firstPost = {
  postTitle: "To Do",
  postDate: "July 25th",
  postBody: "Don't forget to do the laundry, reply to the recruiter, and get back to Olivia.",
};

const posts = [firstPost];


app.get("/", function(req, res) {
  res.render("all", {posts: posts});
});

app.get("/new", function(req, res) {
  res.render("new");
});

app.get("/entry/:entryId", function(req, res) {
  posts.forEach(function(post) {
    if (req.params.entryId === post.postTitle) {
      res.render("entry", {postTitle: post.postTitle, postDate: post.postDate, postBody: post.postBody});
    }
    console.log("urlID: " + req.params.entryId, ", postId: " + post.postTitle)
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/new", function(req, res){
  const post = {
    postTitle: req.body.postTitle,
    postDate: req.body.postDate,
    postBody: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
