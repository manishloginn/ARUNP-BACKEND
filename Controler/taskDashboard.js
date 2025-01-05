const taskDelegation = require("../model/taskDelegation")

const taskDashboard = async ( req, res) => {
    try {
        const taskData = await taskDelegation.find().populate('assignBy')

        res.status(200).json({
            message:"data fetch successfull",
            data:taskData
        })

        // res.send(taskData)
    } catch (error) {
        return res.status(500).json({
            message: "Server error", error: error.message
        })
    }

}

module.exports = {taskDashboard}