import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import History from "./pages/history/History";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

const routing = (
    <Router>
        <React.StrictMode>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="login" element={<Login />} />
                <Route exact path="register" element={<Register />} />
                <Route exact path="dashboard" element={<Dashboard />} />
                <Route exact path="history" element={<History />} />
            </Routes>
        </React.StrictMode>
    </Router>
);

root.render(routing);
