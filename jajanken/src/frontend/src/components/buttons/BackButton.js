import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <div className="buttons-container">
            <Link to={"/dashboard"} className="back-btn">
                Go Back
            </Link>
        </div>
    );
};

export default BackButton;
