import axios from "axios";

const isLocal = window.location.hostname === "localhost";
const API = axios.create({
  // baseURL: "https://school-application-s853.onrender.com/api", // backend URL
    baseURL: isLocal 
    ? "http://localhost:4000/api" // local backend
    : "https://school-application-s853.onrender.com/api", // production backend
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
