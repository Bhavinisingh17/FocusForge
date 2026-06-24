const mongoose = require ("mongoose");

const streakSchema = new mongoose.Schema({
    currentStreak:{
       type: Number,
       default: 0
    },

    lastCompletedDate: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model("Streak", streakSchema);

