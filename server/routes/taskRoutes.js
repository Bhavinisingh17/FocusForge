const express = require("express");
const router = express.Router();

const {
    getTask,
    createTask,
    updateTask,
    deleteTask
    
} = require("../controller/taskController");


router.get("/", getTask );
router.post("/", createTask );
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;