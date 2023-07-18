import React, { useRef } from "react";
import getUserId from "../../utils/userId";
import { createPasswordEntry } from "../../utils/requests";

const CreateForm = ({ isVisible, handleCancel }) => {
    const websiteNameRef = useRef(null);
    const websiteUrlRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const userId = getUserId();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            user_id: userId,
            website_name: websiteNameRef.current.value,
            website_url: websiteUrlRef.current.value,
            website_account_name: usernameRef.current.value,
            website_password: passwordRef.current.value,
        };

        createPasswordEntry(formData);
    };
    const modalClassName = isVisible ? "modal-visible" : "modal-hidden";

    return (
        <div className={modalClassName}>
            <div className="grid">
                <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="htmlForm login"
                >
                    <div className="form__field">
                        <label htmlFor="login__website-name">
                            <svg className="icon">
                                <use href="#icon-website-name"></use>
                            </svg>
                            <span className="hidden">Website Name</span>
                        </label>
                        <input
                            autoComplete="username"
                            id="login__website-name"
                            ref={websiteNameRef}
                            type="text"
                            name="website-name"
                            className="form__input"
                            placeholder="Website Name"
                            required
                        />
                    </div>

                    <div className="form__field">
                        <label htmlFor="login__website-url">
                            <svg className="icon">
                                <use href="#icon-globe"></use>
                            </svg>
                            <span className="hidden">Website Url</span>
                        </label>
                        <input
                            autoComplete="username"
                            id="login__website-url"
                            ref={websiteUrlRef}
                            type="text"
                            name="website-url"
                            className="form__input"
                            placeholder="Website URL"
                        />
                    </div>

                    <div className="form__field">
                        <label htmlFor="login__username">
                            <svg className="icon">
                                <use href="#icon-user"></use>
                            </svg>
                            <span className="hidden">Username</span>
                        </label>
                        <input
                            autoComplete="username"
                            id="login__username"
                            ref={usernameRef}
                            type="text"
                            name="username"
                            className="form__input"
                            placeholder="Username/Email"
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
                            ref={passwordRef}
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
                            value="Save"
                        />
                        <input
                            className="cancel-btn"
                            type="button"
                            value="Cancel"
                            onClick={handleCancel}
                        />
                    </div>
                </form>

                <svg xmlns="http://www.w3.org/2000/svg" className="icons">
                    <symbol id="icon-website-name" viewBox="0 0 576 512">
                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V428.7c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4c-.9 .1-1.8 .2-2.7 .2H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7L384 203.6V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM549.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L512.1 262.7l-71-71L311.9 321z" />
                    </symbol>
                    <symbol id="icon-lock" viewBox="0 0 1792 1792">
                        <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
                    </symbol>
                    <symbol id="icon-user" viewBox="0 0 1792 1792">
                        <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                    </symbol>
                    <symbol id="icon-globe" viewBox="0 0 512 512">
                        <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                    </symbol>
                </svg>
            </div>
        </div>
    );
};

export default CreateForm;
