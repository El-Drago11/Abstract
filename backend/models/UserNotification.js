const mongoose = require('mongoose')

const userNotificationSchema = new mongoose.Schema(
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

module.exports = mongoose.model("UserNotification",userNotificationSchema);