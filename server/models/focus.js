const mongoose = require ("mongoose");

const focusSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },
    totalFocusTime:{
        type: Number,
        default: 0
    },
     totalSession:{
        type: Number,
        default: 0
    },
})



module.exports = mongoose.model("Focus", focusSchema);