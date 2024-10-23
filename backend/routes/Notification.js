const express = require('express');
const router = express.Router();

const {SendNotificationAlert} = require('../controller/notificationController')

router.post('/sendNotification',SendNotificationAlert)

module.exports = router