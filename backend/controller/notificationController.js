// Socket connection
const userNotification = require('../models/UserNotification');

module.exports.SendNotificationAlert = (io) => {

    io.on('connection', (socket) => {
        // console.log(`User connected: ${socket.id}`);
        
        // Listen for 'user-message' event
        socket.on('user-message', async (userdata) => {
            const {title,description} = userdata;

            console.log('Recievd at backend : ',userdata)

            if (title && description) {
                try {

                    // Save the message to the database
                    const userMessage = await userNotification.create({ createdBy:title, NotificationMessage: description});
                    
                    // Emit the message to all connected clients
                    io.emit("message-server", userdata);
                    
                    // Optionally emit success status back to the sender
                    socket.emit('save-status', {
                        success: true,
                        data: userMessage,
                        message: 'Message saved successfully to the database'
                    });
                } catch (error) {
                    // Notify the sender of the error
                    socket.emit('save-status', {
                        success: false,
                        error,
                        message: 'Unable to save the message to the database'
                    });
                }
            } else {
                // Notify the sender that the message is empty
                socket.emit('save-status', {
                    success: false,
                    message: 'Internal error: message is empty, nothing to save'
                });
            }
        });
    });
};
