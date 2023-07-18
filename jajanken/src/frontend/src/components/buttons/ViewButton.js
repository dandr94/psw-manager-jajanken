import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ViewButton = ({ isFieldVisible, onVisibilityToggle }) => {
    const icon = isFieldVisible ? faEyeSlash : faEye;
    const title = isFieldVisible ? "Hide" : "Show";

    return (
        <div>
            <button
                className="view-button"
                title={title}
                onClick={onVisibilityToggle}
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        </div>
    );
};

export default ViewButton;
