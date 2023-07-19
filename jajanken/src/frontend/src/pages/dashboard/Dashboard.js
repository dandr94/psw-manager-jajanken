import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import CreateButton from "../../components/buttons/CreateButton";
import HistoryButton from "../../components/buttons/HistoryButton";
import LogoutButton from "../../components/buttons/LogoutButton";
import DashboardEntries from "../../components/DashboardEntries";
import "./Dashboard.css";
import { getDashboardEntries } from "../../utils/requests";
import SearchBar from "../../components/SearchBar";

function Dashboard() {
    const [entries, setEntries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handleSearch = (value) => {
            setSearchTerm(value);
        };

        getDashboardEntries(setEntries, setLoading);
    }, [setEntries, setLoading, setSearchTerm]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <div className="container">
            <Title />
            <LogoutButton />
            <HistoryButton />
            <CreateButton />
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            {loading ? (
                <p className="no-entries">Loading...</p>
            ) : (
                <DashboardEntries entries={entries} searchTerm={searchTerm} />
            )}
        </div>
    );
}

export default Dashboard;
