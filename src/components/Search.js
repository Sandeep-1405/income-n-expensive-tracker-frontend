import React from 'react';

const Search = ({inputText,onChangeSearch}) => {
    return (
        <div className="col-lg-6 col-md-6 mb-3 mb-lg-0">
          <input
            type="search"
            className="form-control"
            placeholder="Search by Name/Area&Crop..."
            value={inputText}
            onChange={(e) => onChangeSearch(e)}
          />
        </div>
    );
};

export default Search;