import axiosClient from "./axiosSettings";

const tokenManager = {
    getAccessToken() {
        return localStorage.getItem("access_token");
    },

    getRefreshToken() {
        return localStorage.getItem("refresh_token");
    },

    setTokens(access, refresh) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    },

    removeTokens() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    },

    refreshAccessToken() {
        return new Promise((resolve, reject) => {
            const refreshToken = this.getRefreshToken();
            axiosClient
                .post("token/refresh/", { refresh: refreshToken })
                .then((response) => {
                    const { access, refresh } = response.data;
                    this.setTokens(access, refresh);
                    resolve(access);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    startTokenRefreshInterval() {
        setInterval(() => {
            this.refreshAccessToken()
                .then((access) => {})
                .catch((error) => {
                    console.error("Error refreshing access token:", error);
                });
        }, 1 * 60 * 1000);
    },
};

const isLoggedIn = () => {
    const accessToken = tokenManager.getAccessToken();

    if (accessToken) {
        return true;
    }

    return false;
};

if (isLoggedIn) {
    tokenManager.startTokenRefreshInterval();
}

export default tokenManager;
