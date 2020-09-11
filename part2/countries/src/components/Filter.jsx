import React from "react";

const Filter = ({ setFilterName }) => {
  const handleFilter = (e) => {
    setFilterName(e.target.value.toLowerCase());
  };
  return (
    <p>
      find countries <input onChange={handleFilter} type="text" />
    </p>
  );
};

export default Filter;
