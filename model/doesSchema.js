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
    mobile: {
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
        enum:[ 'Option 1',
            'Option 2',
            'Option 3',
            'Option 4',
            'Option 5',
            'Option 6',
            'Option 7',
            'Option 8',
            'Option 9',
            'Option 10',],
        default:[]
    }
})

module.exports = mongoose.model('doer', doer)