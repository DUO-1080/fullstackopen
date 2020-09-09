import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((pre, part) => pre + part.exercises, 0)}
    </p>
  );
};

export default Total;
