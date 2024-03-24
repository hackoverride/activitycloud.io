import axios from "axios";
// const API_URL = "http://localhost:4000/";
const API_URL = "https://activitycloudserver-a3711ca21572.herokuapp.com/";

export const getActivities = async (dateFrom, dateUntil) => {
  console.log(API_URL + `activity/date-range/${dateFrom}/${dateUntil}`);
  const response = await axios.get(
    API_URL + `activity/date-range/${dateFrom}/${dateUntil}`
  );
  return response;
};

export const getActivityById = async (id) => {
  const response = await axios.get(API_URL + `activity/${id}`);
  return response;
};

export const createNewActivity = async (activity, token) => {
  const response = await axios.post(API_URL + "activity", activity, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};
