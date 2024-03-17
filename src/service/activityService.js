import axios from "axios";
const API_URL = "https://activitycloudserver-a3711ca21572.herokuapp.com/";

export const getActivities = async (dateFrom, dateUntil) => {
  console.log(API_URL + `activity/date-range/${dateFrom}/${dateUntil}`);
  const response = await axios.get(
    API_URL + `activity/date-range/${dateFrom}/${dateUntil}`
  );
  return response;
};
