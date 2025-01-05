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
    }
})

module.exports = mongoose.model('doer', doer)