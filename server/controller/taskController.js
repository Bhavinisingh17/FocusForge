const crypto = require("crypto");
const Task = require("../models/task");



///createTask

const createTask = async (req, res) => {
   const newTask = new Task ({
    task: req.body.task,
    date: req.body.dueDate,
    status: req.body.status
   });
   await newTask.save();
    console.log(newTask);
    res.redirect("/index.html");
};

///getTask---for seeing the task

const getTask = async(req, res) => {
    const allTask = await Task.find();
    res.json(allTask);
}

///edit task

const updateTask = async(req, res) => {
    let {id} = req.params;

    let updatedTask = req.body.task;

    let task = await Task.findById(id);

    if (!task) {
        return res.sendStatus(404);
    }

    task.task = updatedTask;
    await task.save();
    res.sendStatus(200);
    console.log("edit id", id);
}


const deleteTask = async(req, res) => {
   const {id} = req.params;


   let deletedTask = await Task.findByIdAndDelete(id);


   res.sendStatus(200);


}

module.exports = {
    getTask,
    createTask,
    deleteTask,
    updateTask
}




