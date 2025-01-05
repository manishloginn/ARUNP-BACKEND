const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const taskDelegationSchema = new Schema({
    assignBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doer"
    },
    description:{
        type:String, 
        require:true
    },
    dateTime:{
        type:String,
        require: true
    }, 
    planedTime:{
        type:Date,
        default:Date.now,
        require:true
    },
    status:{
        type:String,
        enum:["Pending", "Complete"],
        default:"Pending",
    },
    completeTime : {
        type:Date,
        default:''
    }
    // voicenote:{
    //     type:String,
    // }
})

module.exports = mongoose.model('taskDelegationSchema', taskDelegationSchema)