import React from "react";
import "./App.css";
import Title from "./components/Title";
import LoginButton from "./components/buttons/LoginButton";
import RegisterButton from "./components/buttons/RegisterButton";

function App() {
    return (
        <div className="container">
            <Title />
            <div className="buttons-container">
                <LoginButton />
                <RegisterButton />
            </div>
        </div>
    );
}

export default App;
