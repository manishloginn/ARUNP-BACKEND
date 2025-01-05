const taskDelegation = require("../model/taskDelegation");

const changeStatus = async (req, res) => {
    const {id, status} = req.body;

    if(!id || !status) {
        return res.status(404).json({
            message:"please fill all details"
        })
    }

    try {

        const findTask = await taskDelegation.findById(id);
        findTask.status = status

        findTask.completeTime = Date.now()

        findTask.save()

        res.status(200).json({
            message:"Task status change successfull",
            data:findTask
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }

}

module.exports = changeStatus