import React from "react";
import { useNavigate } from "react-router-dom";
import tokenManager from "../../utils/tokenManager";
import { logout } from "../../utils/requests";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(tokenManager, navigate);
    };

    return (
        <div className="logout-btn">
            <button className="delete-entry-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
