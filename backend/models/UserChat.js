const mongoose = require('mongoose')

const userChatSchema = new mongoose.Schema(
    {
        createdBy:{
            type:String,
            require:true,
            trim:true
        },
        NotificationMessage:{
            type:String,
            require:true,
        },
        createdOn:{
            type:Date,
            default:Date.now,
        }
    }
)

module.exports = mongoose.model("UserChat",userChatSchema);