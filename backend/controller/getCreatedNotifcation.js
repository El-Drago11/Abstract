const userNotification = require('../models/UserNotification')

exports.getUserNotification= async(req,res)=>{
    try {
        const Notification = await userNotification.find();
        return res.status(200).json({
            success:true,
            data:Notification,
            message: "All notification fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            data:null,
            message: 'Unable to get all the records'
        })
    }
}