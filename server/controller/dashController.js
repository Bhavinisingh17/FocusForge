const Task = require("../models/task");
const Streak = require("../models/streak");



////whole code is for when checkbox got checked then multiple things happen at once

const checkTask = async (req, res) => {

///part-1  
//This updates the status when checkbox got checked
    try {

        await Task.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        let streak = await Streak.findOne();

        if (!streak) {
            streak = await Streak.create({
                currentStreak: 0,
                lastCompletedDate: null
            });
        }

///part-2

///it updates the streak when checkbox got checked


        const today = new Date().toISOString().split("T")[0];

        const lastCompletedDate =
            streak.lastCompletedDate?.toISOString().split("T")[0];

        if (!streak.lastCompletedDate) {

            streak.currentStreak = 1;
            streak.lastCompletedDate = new Date();

        } else if (lastCompletedDate === today) {

            console.log("Task already counted today");

        } else {

            const lastDate = new Date(streak.lastCompletedDate);
            const currentDate = new Date();

            const diff = Math.floor(
                (currentDate - lastDate) / (1000 * 60 * 60 * 24)
            );

            if (diff === 1) {
                streak.currentStreak++;
            } else {
                streak.currentStreak = 1; // or 0 if that's the behavior you want
            }

            streak.lastCompletedDate = new Date();
        }

        await streak.save();

        res.json({
            success: true,
            currentStreak: streak.currentStreak
        });

    } 
    
    
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false
        });
    }
};



////this part is when you open the app

const streakCount = async (req, res) => {

    let streak = await Streak.findOne();

    if (!streak) {
        streak = await Streak.create({
            currentStreak: 0,
            lastCompletedDate: null
        });
    }


     // Check if streak is broken
    if (streak.lastCompletedDate) {

        const today = new Date().toISOString().split("T")[0];
        const lastCompletedDate =
            streak.lastCompletedDate.toISOString().split("T")[0];

        const diff = Math.floor(
            (new Date(today) - new Date(lastCompletedDate))
            / (1000 * 60 * 60 * 24)
        );

        if (diff > 1) {
            streak.currentStreak = 0;
            await streak.save();
        }
    }

    res.json(streak);
};


/////for weekly progress

const weeklyProgress = async(req, res) => {

        const tasks = await Task.find({
            status: "completed",
        });


        const progress = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0
        };

    tasks.forEach(task => {
      const completedDate = task.completedAt || task.date;

    const day = new Date(completedDate).getDay();

 if (day === 0) progress.Sun++;
    else if (day === 1) progress.Mon++;
    else if (day === 2) progress.Tue++;
    else if (day === 3) progress.Wed++;
    else if (day === 4) progress.Thu++;
    else if (day === 5) progress.Fri++;
    else if (day === 6) progress.Sat++;
});
          res.json(progress);
}

module.exports = {
    checkTask,
    streakCount,
    weeklyProgress
};