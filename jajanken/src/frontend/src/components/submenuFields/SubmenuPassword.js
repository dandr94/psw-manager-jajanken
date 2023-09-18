import React, { useState } from "react";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import CopyButton from "../buttons/CopyButton";
import { updateSubmenuFieldData } from "../../utils/requests";

const SubmenuPassword = ({ password, entryId }) => {
    const [currentPassword, setCurrentPassword] = useState(password);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedPassword, setEditedPassword] = useState(password);
    const websitePasswordtField = "website_password";

    const handleVisibilityToggle = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const handleEditModeToggle = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
    };

    const handlePasswordChange = (e) => {
        setEditedPassword(e.target.value);
    };

    const handlePasswordSave = () => {
        updateSubmenuFieldData(
            entryId,
            editedPassword,
            websitePasswordtField,
            setCurrentPassword,
            setIsEditMode
        );
    };

    return (
        <li>
            <div className="group">
                <span className="label">Password:</span>
                {isEditMode ? (
                    <input
                        className="password-text"
                        type="text"
                        value={editedPassword}
                        onChange={handlePasswordChange}
                    />
                ) : (
                    <input
                        className="password-text"
                        type={isPasswordVisible ? "text" : "password"}
                        value={isPasswordVisible ? currentPassword : "********"}
                        readOnly
                    />
                )}
                <div className="card-buttons">
                    <ViewButton
                        isFieldVisible={isPasswordVisible}
                        onVisibilityToggle={handleVisibilityToggle}
                    />
                    <CopyButton textToCopy={currentPassword} />
                    <EditButton
                        isEditMode={isEditMode}
                        onEditModeToggle={handleEditModeToggle}
                        onSave={handlePasswordSave}
                    />
                </div>
            </div>
        </li>
    );
};

export default SubmenuPassword;
