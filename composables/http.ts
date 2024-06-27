// http.js
import axios, { AxiosInstance, AxiosError } from "axios";

//const url = "https://mc.mydatacoin.io";
const url = "http://195.38.165.82:5073";

const http: AxiosInstance = axios.create({
  baseURL: url
});

http.interceptors.request.use((config) => {
  config.params = { ...config.params };
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Response Status:", error.response.status);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default http;
