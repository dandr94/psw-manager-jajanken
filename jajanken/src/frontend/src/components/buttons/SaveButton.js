import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";

const SaveButton = () => {
    const [isSaveMode, setIsSaveMode] = useState(false);
    const icon = isSaveMode ? faCheck : faPenToSquare;
    const title = isSaveMode ? "Save" : "Edit";

    const handleSaveModeToggle = () => {
        setIsSaveMode((prevSaveMode) => !prevSaveMode);
    };

    return (
        <button
            className={isSaveMode ? "save-button" : "edit-button"}
            title={title}
            onClick={handleSaveModeToggle}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

export default SaveButton;
