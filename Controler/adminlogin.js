const adminschema = require("../model/adminschema");
const jwt = require('jsonwebtoken');
const doesSchema = require("../model/doesSchema");

const adminlogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        let admin = await adminschema.findOne({ email });
        let role = "admin";

        if (!admin) {
            admin = await doesSchema.findOne({ email });
            role = "doer";
        }
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isPasswordMatch = password == admin.password

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       
        const token = jwt.sign({ email, id:admin._id, role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // secure:true,
            maxAge: 60 * 60 * 1000,
            sameSite: 'Strict',
        });

        return res.status(200).json({  message: `${role} login successful` , token , role});

    } catch (error) {
        res.status(500).json({ error: 'error', details: error.message });
    }
}

module.exports = adminlogin