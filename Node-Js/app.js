const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let blogs = [
    { title: "Blog title update 1", intro: "this is blog intro 1" },
    { title: "Blog title 2", intro: "this is blog intro 2" },
    { title: "Blog title 3", intro: "this is blog intro 3" },
  ];

  res.render("home", {
    blogs,
    title: "Home"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About"
  });
})

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact"
  });
});

app.get("/contact-us", (req, res) => {
  res.redirect("/contact", {
    title: "Contact"
  });
});


app.use((req, res) => {
  res.render("404", {title: "404"});
  res.status(404);
});

app.listen(3000, () => {
  console.log("app started running on port 3000");
});
