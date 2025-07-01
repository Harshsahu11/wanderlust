const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

const sessionsOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionsOptions));
app.use(flash());

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    req.flash("Success", "User Registered");
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    const messages = req.flash('Success');
    console.log(messages);
    res.render("page.ejs", { name: req.session.name, msg: messages });
});

app.get("/test", (req, res) => {
    res.send("Test Successful");
});

app.listen(3000, () => {
    console.log("Server is active on 3000");
});
