const Task = require("../models/task");


const checkTask = async(req, res) => {
    await Task.findByIdAndUpdate(
        req.params.id, //findk by id tas
        req.body  //update it's status by request send from frontend
    );
    res.json({ success: true });
}

module.exports = checkTask;