const taskDelegation = require("../model/taskDelegation")

const notCompleted = async (req, res) => {
    try {

        const data = await taskDelegation.find().populate('assignBy')

        const filterData = data.filter((value) => 
            value.status === "Pending"
        )

        res.status(200).json({
            message:"data fetch successfull",
            data:filterData
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
   
    }
}

module.exports = notCompleted