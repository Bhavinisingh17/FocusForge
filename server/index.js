
//Step-1
// /require the express

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const Task = require("./models/task.js");
const Focus = require("./models/focus.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const session = require("express-session");

const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
};


const app = express();
const port = 8080;


const taskRoutes = require("./routes/taskRoutes");


app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(      
  { usernameField: "email" },
User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "../public")));


app.use("/tasks", taskRoutes);



app.listen(port,()=>{
    console.log(port, "listen");
});













