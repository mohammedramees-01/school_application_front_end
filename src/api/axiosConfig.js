import axios from "axios";

const API = axios.create({
  baseURL: "https://school-application-s853.onrender.com/api", // backend URL
  
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
