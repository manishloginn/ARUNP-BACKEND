const doesSchema = require("../model/doesSchema");
const { findOne } = require("../model/doesSchema");

const addDoer = async ( req, res) => {
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({message:"Please fill name and email both"})
    }
    try {
        const allreaddyRegistered = await doesSchema.findOne({email})
        if(allreaddyRegistered){
            return res.status(409).json({message:"Doer already registered"})
        }

        const newDoer = new doesSchema({
            name,
            email
        })

        newDoer.save()

        res.status(200).json({
            message:"Doer Registration successfull",
            data:newDoer
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


const editDoer = async (req, res) => {
    const {id, name, email} = req.body;

    if(!id, !name, !email){
        return res.status(400).json({
            message:"Please fill name and email both"
        })
    }

    try {
        const findDoer = await doesSchema.findById(id)
        if(!findDoer){
            return res.status(404).json({
                message:"Doer not found",
            })
        }

        const allreaddyExist = await doesSchema.findOne({email})

        if(allreaddyExist){
            return res.status(409).json({
                message:"Doer allreaddy Exist with this email"
            })
        }
        
        findDoer.name = name,
        findDoer.email = email;
        findDoer.save()
        res.status(200).json({
            message:"changes successfull",
            data:findDoer
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


const deleteDoer = async (req, res) => {
    const {id} = req.body;

    // console.log(id)

    if(!id){
        return res.status(400).json({
            message:"please send doer id"
        })
    }

    try {
        const findDoer = await doesSchema.findByIdAndDelete(id)
        if(!findDoer){
            return res.status(404).json({
                message:"Doer not found"
            })
        }
        res.status(200).json({
            message:"Doer delete successfull"
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {addDoer, editDoer, deleteDoer}