const taskDelegation = require("../model/taskDelegation");

const addRevision = async (req, res) => {
    const {id, assignBy, description, dateTime, status} = req.body;

    console.log(id, assignBy, description, dateTime, status)

    if(!id || !assignBy || !description || !dateTime || !status) {
        return res.status(400).json({
            message:"please fill all details"
        })
    }


    try {

        const findTask = await taskDelegation.findById(id);

        if(!findTask){
            return res.status(404).json({
                message:"task not found"
            })
        }

        findTask.assignBy =assignBy
        findTask.description= description
        findTask.dateTime = dateTime
        findTask.status = status
        
        findTask.save()
        
        res.status(200).json({
            message:"task updated successfull",
            data:findTask
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
 
    }
}

module.exports = addRevision