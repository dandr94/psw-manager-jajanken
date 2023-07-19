import jwt_decode from "jwt-decode";

const getUserId = () => {
    const accessToken = localStorage.getItem("access_token");
    const decodedToken = jwt_decode(accessToken);
    const userId = decodedToken.user_id;

    return userId;
};

export default getUserId;
