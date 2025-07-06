import React from "react";

function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="d-flex justify-content-center">
      <input
        type="text"
        className="form-control mb-3 w-100 "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
