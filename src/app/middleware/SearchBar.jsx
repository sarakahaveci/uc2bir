import React from 'react';

const SearchBar = ({className}) => {
    return (
        <div className={className}>
            <div className="search-container">
                <div className="search-items"></div>
            </div>
        </div>
    );
};

export default SearchBar;