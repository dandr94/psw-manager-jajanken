import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SubmenuPassword from "./submenuFields/SubmenuPassword";
import SubmenuAccountName from "./submenuFields/SubmenuAccountName";
import SubmenuUrl from "./submenuFields/SubmenuUrl";
import DeleteButton from "./buttons/DeleteButton";

const DashboardEntries = ({ entries, searchTerm }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const [submenuVisibility, setSubmenuVisibility] = useState({});

    const handleDropdownToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
        setSubmenuVisibility((prevVisibility) => ({
            ...prevVisibility,
            [index]: !prevVisibility[index],
        }));
    };

    const entryTitle = (title, index) => {
        return (
            <div className="link" onClick={() => handleDropdownToggle(index)}>
                {title}
                <div className="icon-arrow">
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        );
    };

    const filteredEntries = entries.filter((entry) =>
        entry.website_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const list_entries = filteredEntries.map((entry, index) => {
        const isOpen = openIndex === index;
        const submenuClass =
            isOpen && submenuVisibility[index] ? "submenu open" : "submenu";
        const submenuDisplay = submenuVisibility[index] ? "block" : "none";

        return (
            <li key={entry.id}>
                {entryTitle(entry.website_name, index)}
                {isOpen && (
                    <ul
                        className={submenuClass}
                        style={{ display: submenuDisplay }}
                    >
                        <SubmenuUrl
                            url={entry.website_url}
                            entryId={entry.id}
                        />
                        <SubmenuAccountName
                            accountName={entry.website_account_name}
                            entryId={entry.id}
                        />
                        <SubmenuPassword
                            password={entry.website_password}
                            entryId={entry.id}
                        />
                        <DeleteButton entryId={entry.id} />
                    </ul>
                )}
            </li>
        );
    });

    return entries && entries.length === 0 ? (
        <p className="no-entries">Can't find any entries!</p>
    ) : (
        <ul id="dropdown" className="dropdown">
            {list_entries}
        </ul>
    );
};

export default DashboardEntries;
