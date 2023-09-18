import React, { useState } from "react";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import CopyButton from "../buttons/CopyButton";
import { updateSubmenuFieldData } from "../../utils/requests";

const SubmenuAccountName = ({ accountName, entryId }) => {
    const [currentAccountName, setCurrentAccountName] = useState(accountName);
    const [isAccountNameVisible, setIsAccountNameVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedAccountName, setEditedAccountName] = useState(accountName);
    const websiteAccountField = "website_account_name";

    const handleVisibilityToggle = () => {
        setIsAccountNameVisible((prevState) => !prevState);
    };

    const handleEditModeToggle = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
    };

    const handleaccountNameChange = (e) => {
        setEditedAccountName(e.target.value);
    };

    const handleAccountNameSave = () => {
        updateSubmenuFieldData(
            entryId,
            editedAccountName,
            websiteAccountField,
            setCurrentAccountName,
            setIsEditMode
        );
    };

    return (
        <li>
            <div className="group">
                <span className="label">User/Email:</span>
                {isEditMode ? (
                    <input
                        className="password-text"
                        type="text"
                        value={editedAccountName}
                        onChange={handleaccountNameChange}
                    />
                ) : (
                    <input
                        className="password-text"
                        type={isAccountNameVisible ? "text" : "password"}
                        value={
                            isAccountNameVisible
                                ? currentAccountName
                                : "********"
                        }
                        readOnly
                    />
                )}
                <div className="card-buttons">
                    <ViewButton
                        isFieldVisible={isAccountNameVisible}
                        onVisibilityToggle={handleVisibilityToggle}
                    />
                    <CopyButton textToCopy={currentAccountName} />
                    <EditButton
                        isEditMode={isEditMode}
                        onEditModeToggle={handleEditModeToggle}
                        onSave={handleAccountNameSave}
                    />
                </div>
            </div>
        </li>
    );
};

export default SubmenuAccountName;
