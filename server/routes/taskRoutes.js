const express = require("express");
const router = express.Router();

const { checkTask } = require("../controller/dashController");


const {
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskCount,
    
    
} = require("../controller/taskController");

router.get("/count", getTaskCount);
router.get("/", getTask );
router.post("/", createTask );
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);


// Dashboard checkbox complete task
router.patch("/:id/complete", checkTask);

module.exports = router;