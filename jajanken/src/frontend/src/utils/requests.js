import axiosClient from "./axiosSettings";
import tokenManager from "./tokenManager";

export const login = async (formData, navigate, setErrorMessage) => {
    try {
        const response = await axiosClient.post("login/", formData);
        const { access_token, refresh_token } = response.data;
        tokenManager.setTokens(access_token, refresh_token);
        navigate("/dashboard");
    } catch (error) {
        setErrorMessage(error.response.data.error);
    }
};

export const register = async (formData, navigate, setErrorMessage) => {
    try {
        await axiosClient.post("register/", formData);
        navigate("/dashboard");
    } catch (error) {
        if (error.response.data) {
            const errorMessages = Object.values(error.response.data).join("\n");
            setErrorMessage(errorMessages);
        }
    }
};

export const logout = async (tokenManager, navigate) => {
    try {
        await axiosClient.post(
            "logout/",
            { refresh_token: tokenManager.getRefreshToken() },
            {
                withCredentials: true,
            }
        );
        tokenManager.removeTokens();
        navigate("/");
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

export const getDashboardEntries = async (setEntries, setLoading) => {
    try {
        const response = await axiosClient.get("dashboard/");
        setEntries(response.data);
        setLoading(false);
    } catch (error) {
        console.error("Error retrieving dashboard data:", error);
        setEntries(null);
        setLoading(false);
    }
};

export const createPasswordEntry = async (formData) => {
    console.log(formData);
    try {
        await axiosClient.post("submit/", formData);
        window.location.reload();
    } catch (error) {
        console.error("Error sending a post request:", error);
    }
};

export const deletePasswordEntry = (entryId, userId) => {
    axiosClient
        .delete(`delete/${entryId}/`, { user_id: userId })
        .then((response) => {
            console.log("Entry deleted:", response.data);
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error sending a delete request:", error);
        });
};

export const getHistoryEntries = async (setHistory, setLoading) => {
    try {
        const response = await axiosClient.get("history/");
        setHistory(response.data);
        setLoading(false);
    } catch (error) {
        console.error("Error retrieving history data:", error);
        setHistory(null);
        setLoading(false);
    }
};

export const updateSubmenuFieldData = (
    entryId,
    value,
    field,
    setCurrentData,
    setIsEditMode
) => {
    axiosClient
        .patch(`update/${entryId}/`, {
            value: value,
            field: field,
        })
        .then(() => {
            setCurrentData(value);
            setIsEditMode(false);
        })
        .catch((error) => {
            console.error("Error sending a patch request", error);
        });
};
