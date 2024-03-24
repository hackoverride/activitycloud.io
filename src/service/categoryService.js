import axios from "axios";
// const API_URL = "http://localhost:4000/";
const API_URL = "https://activitycloudserver-a3711ca21572.herokuapp.com/";

export const getCategories = async () => {
  const response = await axios.get(API_URL + "category");
  return response;
};

// Require admin login
export const createCategory = async (category, token) => {
  const response = await axios.post(API_URL + "category", category, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};
