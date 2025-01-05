const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const otpSchema = new Schema ({
    email : {
        type:String,
        require:true
    },
    otp : {
        type:String,
        require:true
    }
})

module.exports = mongoose.model("otpSchema", otpSchema)