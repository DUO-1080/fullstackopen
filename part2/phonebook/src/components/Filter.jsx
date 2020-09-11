import React from "react";

const Filter = ({ onFilter }) => {

  const handleInputChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div>
      <p>filter show with: </p>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};

export default Filter;
