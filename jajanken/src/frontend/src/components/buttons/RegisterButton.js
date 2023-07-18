import React from "react";
import { Link } from "react-router-dom";

const RegisterButton = () => {
    return (
        <Link to={"/register"} className="register-btn">
            Register
        </Link>
    );
};

export default RegisterButton;
