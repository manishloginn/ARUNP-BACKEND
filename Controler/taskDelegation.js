const taskDelegationSchema = require('../model/taskDelegation')





const taskDelegation = (req, res) => {
    const {assignBy, description, dateTime}  = req.body;

    if(!assignBy || !description || !dateTime){
        return res.status(404).json({
            message:"please fill all details"
        })
    }
    try {
        const newTask = new taskDelegationSchema({
            assignBy, 
            description,
            dateTime
        })

        newTask.save()


        res.send(newTask)
    } catch (error) {
         return res.status(500).json({ message: "Server error", error: error.message });
   
    }
}

module.exports = {taskDelegation}