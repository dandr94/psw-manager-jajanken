import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import HistoryEntries from "../../components/HistoryEntries";
import "./History.css";
import { getHistoryEntries } from "../../utils/requests";
import BackButton from "../../components/buttons/BackButton";

function History() {
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = () => {
        getHistoryEntries(setHistory, setLoading);
    };

    return (
        <div className="container">
            <Title />
            <BackButton />
            {loading ? (
                <p className="no-entries">Loading...</p>
            ) : (
                <HistoryEntries entries={history} />
            )}
        </div>
    );
}

export default History;
