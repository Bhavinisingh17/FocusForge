const express = require("express");
const router = express.Router();
const passport = require("passport");

const { 
        viewDash,
        checkTask,
        streakCount,
        weeklyProgress,
        trackFocus
 } = require("../controller/dashController");


router.patch("/:id/complete", checkTask);
router.get("/streak", streakCount);
router.get("/weekly-progress", weeklyProgress);
router.post("/focus/session", trackFocus);
router.get("/dashBoard", viewDash);

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


  const {
    signupPage, 
    signupUser,
    loginPage,
    loginUser
  } =  require("../controller/authController");


router.get("/signup", signupPage);
router.post("/signup", signupUser);
router.get("/login", loginPage);
router.post("/login",

   passport.authenticate("local", {
         successRedirect: "/tasks/dashBoard",
        failureRedirect: "/tasks/login",
    }),

  loginUser);



module.exports = router;