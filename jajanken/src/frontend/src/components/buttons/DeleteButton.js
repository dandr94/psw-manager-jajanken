import React from "react";
import getUserId from "../../utils/userId";
import { deletePasswordEntry } from "../../utils/requests";

const DeleteButton = ({ entryId }) => {
    const userId = getUserId();

    const handleDeleteEntry = () => {
        deletePasswordEntry(entryId, userId);
    };

    return (
        <div className="delete-entry">
            <button className="delete-entry-button" onClick={handleDeleteEntry}>
                Delete
            </button>
        </div>
    );
};

export default DeleteButton;
