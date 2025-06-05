import axios from "axios";
import { store } from "../../../redux/store";
import { AUTH_URL } from "../../../redux/urls";
import { logoutUser, updateToken } from "./userSlice";

const MAX_RETRIES = 5;
let retryCount = 0;

const BASE_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add a request interceptor
BASE_URL.interceptors.request.use(
  (config) => {
    const { user: user }: any = store.getState();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BASE_URL.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      retryCount < MAX_RETRIES
    ) {
      retryCount++;
      originalRequest._retry = true;

      try {
        const response = await BASE_URL.post(
          AUTH_URL + "/auth/refresh-token",
          {}
        );
        const newAccessToken = response.data;
        store.dispatch(updateToken(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;

        return BASE_URL(originalRequest);
      } catch (refreshError: any) {
        if (refreshError.response?.data?.shouldLogout) {
          store.dispatch(logoutUser());
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default BASE_URL;
