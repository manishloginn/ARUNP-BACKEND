const doesSchema = require("../model/doesSchema")

const getDoer = async (req, res) => {
    try {
        const response = await doesSchema.find()

        res.status(200).json({
            message:"doer fetch successfull",
            data:response
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = getDoer