import React from 'react';

function ServicePriceRange({ minPrice, maxPrice, onPriceChange }) {
  return (
      <div className="d-flex ">
      <div className="">
          <label>Min price</label>
      <input
        type="number"
        className="form-control me-2"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => onPriceChange('minPrice', e.target.value)}
      />
    </div>
      
       <div className="">
      <label>Max price</label>
      <input
        type="number"
        className="form-control"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => onPriceChange('maxPrice', e.target.value)}
      />
    </div>
    </div>
   
  );
}

export default ServicePriceRange;
