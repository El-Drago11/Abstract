// const BASE_URL = "http://localhost:8000/api/v1";

const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);


export const notificationApi= {
    SENDNOTIFICATION_API : BASE_URL+"/sendNotification",
    GETALLNOTIFICATION_API : BASE_URL+"/getAllNotification"
}
