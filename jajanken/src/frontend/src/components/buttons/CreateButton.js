import React, { useState } from "react";
import CreateForm from "../forms/CreateForm";

const CreateButton = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleButtonClick = () => {
        setModalVisible(!isModalVisible);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    return (
        <div className="create">
            <button
                className="create-btn modal-btn"
                onClick={handleButtonClick}
            >
                Create
            </button>
            <CreateForm
                isVisible={isModalVisible}
                handleCancel={handleModalCancel}
            />
        </div>
    );
};

export default CreateButton;
