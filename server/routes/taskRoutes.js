const express = require("express");
const router = express.Router();

const { checkTask,
        streakCount,
        weeklyProgress,
        trackFocus
 } = require("../controller/dashController");


router.patch("/:id/complete", checkTask);
router.get("/streak", streakCount);
router.get("/weekly-progress", weeklyProgress);
router.post("/focus/session", trackFocus);


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
router.delete("/:id", deleteTask)



module.exports = router;