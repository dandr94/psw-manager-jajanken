import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";

const EditButton = ({ isEditMode, onEditModeToggle, onSave }) => {
    const handleClick = () => {
        if (isEditMode) {
            onSave();
        } else {
            onEditModeToggle();
        }
    };

    const icon = isEditMode ? faSave : faPen;
    const title = isEditMode ? "Save" : "Edit";

    return (
        <button className="edit-button" title={title} onClick={handleClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

export default EditButton;
