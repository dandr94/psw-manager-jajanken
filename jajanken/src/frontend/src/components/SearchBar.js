import "./SearchBar.css";

const SearchBar = ({ searchTerm, onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for entry..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
