import React from "react";

function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="">
           <label>Search</label>
      <input
        type="text"
        className="form-control  "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
