import React, { useState } from "react";
import SearchBar from "./SearchBar";

const HistoryEntries = ({ entries }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const getStatusColor = (status) => {
        switch (status) {
            case "Created":
                return "green";
            case "Updated":
                return "yellow";
            case "Deleted":
                return "red";
            default:
                return "";
        }
    };

    if (!entries || entries.length === 0)
        return <p className="no-entries">Can't find any entries!</p>;

    const dateFix = (date) => {
        const date_split = date.split("T");
        const time = date_split[1].slice(0, 8);
        return `${date_split[0]} at ${time}`;
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredEntries = entries.filter((entry) =>
        entry.website_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listHistoryEntries = filteredEntries.map((entry) => {
        return (
            <React.Fragment key={entry.id}>
                <tr className="tr-entries">
                    <td
                        data-th="Status"
                        className={`status-cell ${getStatusColor(
                            entry.status
                        )}`}
                    >
                        {entry.status}
                    </td>
                    <td data-th="Entry Name" className="entry-name-cell middle">
                        {entry.website_name}
                    </td>
                    <td
                        data-th="Status Changed at"
                        className="status-changed-cell"
                    >
                        {dateFix(entry.status_changed)}
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            <table className="rwd-table">
                <tbody>
                    <tr className="tr-title">
                        <th>Status</th>
                        <th className="middle">Entry</th>
                        <th>Status Changed</th>
                    </tr>
                    {listHistoryEntries}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default HistoryEntries;
