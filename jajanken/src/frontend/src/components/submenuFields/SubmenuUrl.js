import React, { useState } from "react";
import EditButton from "../buttons/EditButton";
import CopyButton from "../buttons/CopyButton";
import { updateSubmenuFieldData } from "../../utils/requests";

const SubmenuUrl = ({ url, entryId }) => {
    const [currentUrl, setCurrentUrl] = useState(url);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUrl, setEditedUrl] = useState(url);
    const websiteUrlField = "website_url";

    const handleEditModeToggle = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
    };

    const handleUrlChange = (e) => {
        setEditedUrl(e.target.value);
    };

    const handleUrlSave = () => {
        updateSubmenuFieldData(
            entryId,
            editedUrl,
            websiteUrlField,
            setCurrentUrl,
            setIsEditMode
        );
    };

    return (
        <li>
            <div className="group">
                <span className="label">URL:</span>
                {isEditMode ? (
                    <input
                        className="url-text"
                        type="url"
                        value={editedUrl}
                        onChange={handleUrlChange}
                    />
                ) : (
                    <a
                        href={currentUrl}
                        className="url-text"
                        contentEditable="false"
                    >
                        {currentUrl}
                    </a>
                )}
                <div className="card-buttons url-buttons">
                    <CopyButton textToCopy={url} />
                    <EditButton
                        isEditMode={isEditMode}
                        onEditModeToggle={handleEditModeToggle}
                        onSave={handleUrlSave}
                    />
                </div>
            </div>
        </li>
    );
};

export default SubmenuUrl;
