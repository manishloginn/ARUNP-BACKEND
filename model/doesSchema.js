const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const doer = new Schema({
    name : {
        type : String, 
        require:true
    }, 
    email: {
        type:String, 
        require:true
    },
    password:{
        type:String,
        require:true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"admin",
        require:true
    },
    powertoaccess:{
        type:[String],
        enum:["option1", "option2", "option3", "option4", "option4"],
        default:[]
    }
})

module.exports = mongoose.model('doer', doer)