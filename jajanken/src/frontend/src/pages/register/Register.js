import React from "react";
import Title from "../../components/Title";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
    return (
        <div className="container">
            <Title />
            <RegisterForm />
            <div className="info">
                <p>
                    Already have an account? Click <a href="/login">HERE</a> to
                    login
                </p>
            </div>
        </div>
    );
};

export default Register;
