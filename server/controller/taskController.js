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
    res.redirect("/pages/index.html");
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


const getTaskCount = async(req, res) => {

    try {
     let total = await Task.countDocuments();
     let todo = await Task.countDocuments({status: "todo"});
     let inprogress = await Task.countDocuments({status: "progress"});
     let completed = await Task.countDocuments({status: "completed"});

       res.json({
            total,
            todo,
            inprogress,
            completed
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


}

module.exports = {
    getTask,
    createTask,
    deleteTask,
    updateTask,
    getTaskCount
}




