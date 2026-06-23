
//Step-1
// /require the express

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const Task = require("./models/task.js");


const app = express();
const port = 8080;

const taskRoutes = require("./routes/taskRoutes");






app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    express.static(
        path.join(__dirname, "../dist")
    )
);

app.get("/", (req, res) => {
    res.send("HOME WORKS");
});

app.use("/tasks", taskRoutes);



app.listen(port,()=>{
    console.log(port, "listen");
});













