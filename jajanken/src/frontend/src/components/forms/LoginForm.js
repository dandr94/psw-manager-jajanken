import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import handleEnterKey from "../../utils/pressedKeyHandler";
import { login } from "../../utils/requests";

const LoginForm = () => {
    const username = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            username: username.current.value,
            password: password.current.value,
        };

        login(formData, navigate);
    };

    return (
        <div className="modal-visible">
            <div className="grid">
                <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="htmlForm login"
                >
                    <div className="form__field">
                        <label htmlFor="login__website-name">
                            <svg className="icon">
                                <use href="#icon-user"></use>
                            </svg>
                            <span className="hidden">Username</span>
                        </label>
                        <input
                            autoComplete="username"
                            id="login__website-name"
                            ref={username}
                            type="text"
                            name="username"
                            className="form__input"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="form__field">
                        <label htmlFor="login__password">
                            <svg className="icon">
                                <use href="#icon-lock"></use>
                            </svg>
                            <span className="hidden">Password</span>
                        </label>
                        <input
                            id="login__password"
                            ref={password}
                            type="password"
                            name="password"
                            className="form__input"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="form__field">
                        <input
                            className="submit-btn"
                            type="submit"
                            value="Login"
                            onKeyDown={handleEnterKey(handleSubmit)}
                        />
                        <input
                            className="cancel-btn"
                            type="button"
                            value="Go back"
                        />
                    </div>
                </form>

                <svg xmlns="http://www.w3.org/2000/svg" className="icons">
                    <symbol id="icon-lock" viewBox="0 0 1792 1792">
                        <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
                    </symbol>
                    <symbol id="icon-user" viewBox="0 0 1792 1792">
                        <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                    </symbol>
                </svg>
            </div>
        </div>
    );
};

export default LoginForm;
