import axios from "axios";
// const API_URL = "http://localhost:4000/";
const API_URL = "https://activitycloudserver-a3711ca21572.herokuapp.com/";

// Frontend handler of token.
export const setToken = (token) => {
  // Take in token, and set it to local storage. - with expiration date.
  let tokenDurationInHours = 8;
  let expirationDate = new Date(
    new Date().getTime() + tokenDurationInHours * 60 * 60 * 1000
  );
  let tokenObject = {
    token: token,
    expirationDate: expirationDate,
  };
  localStorage.setItem("token", JSON.stringify(tokenObject));
};
export const clearToken = () => {
  // Clear token from local storage.
  localStorage.removeItem("token");
};

export const getToken = () => {
  // Get token from local storage, and check if it's expired.
  let tempData = localStorage.getItem("token");
  if (tempData === null) {
    return null;
  }
  let tokenObject = JSON.parse(tempData);
  if (tokenObject === null) {
    return null;
  }
  if (tokenObject?.expirationDate === null) {
    return null;
  }
  let expirationDate = new Date(tokenObject.expirationDate);
  if (expirationDate <= new Date()) {
    localStorage.removeItem("token");
    return null;
  }
  return tokenObject.token;
};

export const submitFeedback = async (feedback) => {
  try {
    const response = await axios.post(API_URL + "feedback", feedback);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (user) => {
  const response = await axios.post(API_URL + "user", user);
  return response;
};

export const loginSubmit = async (user) => {
  const response = await axios.post(API_URL + "user/login", user);
  return response;
};

export const addToActivity = async (activityId, token) => {
  console.log(token);
  const response = await axios.post(
    API_URL + "activity/add-user",
    { activityId: activityId, pax: 1 },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
};

export const fetchProfileDataOnUser = async (token) => {
  const response = await axios.get(API_URL + "user/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};

export const fetchAllActivitiesOnUser = async (token) => {
  const response = await axios.get(API_URL + "engagement/by-user", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};
