import axios from "axios";
const API_URL = "https://activitycloudserver-a3711ca21572.herokuapp.com/";

export const submitFeedback = async (feedback) => {
  try {
    const response = await axios.post(API_URL + "/feedback", feedback);
    return response;
  } catch (error) {
    console.error(error);
  }
};
