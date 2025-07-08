import React from 'react';

function LimitDropdown({ limit, onLimitChange }) {
  return (
    <div className="">
     <label>Limit</label>
      <select
        className="form-select w-auto"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        {[5, 10, 20, 50, 100].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LimitDropdown;
