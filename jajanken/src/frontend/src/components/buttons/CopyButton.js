import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faCheck } from "@fortawesome/free-solid-svg-icons";

const CopyButton = ({ textToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [icon, setIcon] = useState(faClone);
    const title = isCopied ? "Copied!" : "Copy to clipboard";

    const handleCopyToClipboard = () => {
        if (!isCopied) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    setIsCopied(true);
                    setIcon(faCheck);
                    setTimeout(() => {
                        setIsCopied(false);
                        setIcon(faClone);
                    }, 3000);
                })
                .catch((error) => {
                    console.error(
                        "Failed to copy textToCopy to clipboard:",
                        error
                    );
                });
        }
    };

    return (
        <div>
            <button
                className="copy-button"
                title={title}
                onClick={handleCopyToClipboard}
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        </div>
    );
};

export default CopyButton;
