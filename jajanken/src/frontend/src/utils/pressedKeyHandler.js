function handleEnterKey(e, handleSubmit) {
    if (e.key === "Enter") {
        return handleSubmit();
    }
}

export default handleEnterKey;
