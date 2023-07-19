import React from "react";
import Title from "../../components/Title";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
    return (
        <div className="container">
            <Title />
            <LoginForm />
            <div className="info">
                <p>
                    Don't have an account? Click <a href="/register">HERE</a> to
                    register
                </p>
            </div>
        </div>
    );
};

export default Login;
