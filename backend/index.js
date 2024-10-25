const express = require('express');
const app = express();
require('dotenv').config();
const port  = process.env.PORT || 8000;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dbConnect = require('./config/database')
const http = require("http");
const { Server } = require("socket.io");
const notificationRoute = require('./routes/Notification')
const {SendNotificationAlert} = require('./controller/notificationController');
const frontendUrl = process.env.FRONT_END_URL

app.use(cors({
    origin: frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
}))


// Getting socket server instance
const server = http.createServer(app);
// Using socket.io
const io = new Server(server, {
    cors: {
        origin: frontendUrl,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

//passing the instance of the io to the notification controller
SendNotificationAlert(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp"
}));

app.use('/api/v1',notificationRoute)

//connect to the database
dbConnect()

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message : `your server is Running at ${port}`
    })
})

//backend hosted at the server craeted by the websocket
server.listen(port ,(req,res)=>{
    console.log(`APP is  running successful at ${port}`)
})

