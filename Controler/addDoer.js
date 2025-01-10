const doesSchema = require("../model/doesSchema");
const { findOne } = require("../model/doesSchema");

const addDoer = async (req, res) => {
    const { name, email, admin, password, powertoaccess } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill name and email both" })
    }
    try {
        const allreaddyRegistered = await doesSchema.findOne({ email })
        if (allreaddyRegistered) {
            return res.status(409).json({ message: "Doer already registered" })
        }

        const newDoer = new doesSchema({
            name,
            email,
            admin,
            powertoaccess,
            password
        })

        newDoer.save()

        res.status(200).json({
            message: "Doer Registration successfull",
            data: newDoer
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


const editDoer = async (req, res) => {
    const { id, name, email,  powertoaccess } = req.body;
    console.log("hit")
    console.log(id)

    if (!id, !name, !email) {
        return res.status(400).json({
            message: "Please fill name and email both"
        })
    }

    try {
        const findDoer = await doesSchema.findById({_id:id})
        if (!findDoer) {
            return res.status(404).json({
                message: "Doer not found",
            })
        }

        if (findDoer.email !== email) {
            const emailExists = await doesSchema.findOne({ email: email });
            if (emailExists) {
                return res.status(409).json({
                    message: "Another user already exists with this email",
                });
            }
        }

        findDoer.name = name,
        findDoer.email = email;
        findDoer.powertoaccess = powertoaccess;

        findDoer.save()
        res.status(200).json({
            message: "changes successfull",
            data: findDoer
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


const deleteDoer = async (req, res) => {
    const { id } = req.body;

    // console.log(id)

    if (!id) {
        return res.status(400).json({
            message: "please send doer id"
        })
    }

    try {
        const findDoer = await doesSchema.findByIdAndDelete(id)
        if (!findDoer) {
            return res.status(404).json({
                message: "Doer not found"
            })
        }
        res.status(200).json({
            message: "Doer delete successfull"
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { addDoer, editDoer, deleteDoer }