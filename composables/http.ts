// http.js
import axios, { AxiosInstance, AxiosError } from "axios";


const url = "https://api.masterkraska.kg/";

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

let userToken;
if (process.client) {
  const tokenLocal = localStorage.getItem("token");

  if (tokenLocal) {
    userToken = tokenLocal;
  } else {
    userToken = null;
  }
}

console.log("userToken", userToken);
const httpAuth: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${userToken}`
  }
});
httpAuth.interceptors.request.use((config) => {
  config.params = { ...config.params };
  return config;
});

httpAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const authStore = useAuthStore();
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Response Status:", error.response.status);
      if (error.response.status === 401) {
        authStore.refreshToken();
      }
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export { httpAuth };

// /api/v1/User/edit-user
// /api/v1/User/get-user-by-id/{userId}
// /api/v1/User/change-password
// /api/v1/User/reset-password
// /api/v1/User/delete-user-by-id/{userId}
// /api/v1/User/set-notifications-allowance/{userId}/{status}
