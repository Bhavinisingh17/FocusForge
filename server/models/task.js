const mongoose = require ("mongoose");

const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },

    date:{
        type:Date,
        required: true
    },

    status: {
        type: String,
        enum: ["todo", "progress", "completed"]
    },

    completedAt: {
        type: Date,
        default: null
    }
});




const Task = mongoose.model("Task", taskSchema);



module.exports = Task;