const express = require('express');
const router = express.Router();

const {SendNotificationAlert} = require('../controller/notificationController')
const {getUserNotification} = require('../controller/getCreatedNotifcation')

router.post('/sendNotification',SendNotificationAlert)
router.get('/getAllNotification',getUserNotification)

module.exports = router