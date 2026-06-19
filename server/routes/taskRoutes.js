const express = require("express");
const router = express.Router();

const {
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskCount
    
} = require("../controller/taskController");

router.get("/count", getTaskCount);
router.get("/", getTask );
router.post("/", createTask );
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);


module.exports = router;