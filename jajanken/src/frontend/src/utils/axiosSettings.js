import axios from "axios";
import tokenManager from "./tokenManager";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

const axiosClient = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = tokenManager.getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            tokenManager.removeTokens();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
