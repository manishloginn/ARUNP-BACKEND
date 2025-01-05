const adminschema = require("../model/adminschema");

const registeradmin = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"please fill all detail"
        })
    }
    try {
        const admin = new adminschema({
            email, 
            password
        })

        admin.save()

        res.status(200).json({
            message:"registration successfull",
            data:admin
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error", error: error.message
        })
    }



}

module.exports = registeradmin