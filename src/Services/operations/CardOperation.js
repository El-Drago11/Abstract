import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import {notificationApi} from '../api'
const {SENDNOTIFICATION_API,GETALLNOTIFICATION_API} = notificationApi

export const addNotificationDetails = async(data)=>{
  const toastId = toast.loading("Loading...")
  let result = null;
  try {
      const response = await apiConnector("POST", SENDNOTIFICATION_API,data,{"Content-Type": "multipart/form-data"})
      if (!response?.data?.success) {
          throw new Error("Could Not Add Course Details")
        }
        toast.success("Card Details Added Successfully")
        result = response?.data?.data

  } catch (error) {
      toast.error(error?.response?.data?.message || error?.message );
  }
  toast.dismiss(toastId);
  return result;
}


export const getAllNotification = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", GETALLNOTIFICATION_API)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.data
    } catch (error) {
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
