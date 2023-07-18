import React from "react";
import { Link } from "react-router-dom";

const HistoryButton = () => {
    return (
        <div className="history">
            <Link to={"/history"} className="history-btn">
                History
            </Link>
        </div>
    );
};

export default HistoryButton;
