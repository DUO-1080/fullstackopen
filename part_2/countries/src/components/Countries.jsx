import React from "react";
import Country from "./Country";

const Countries = ({ countries, setFilterName }) => {
  return (
    <>
      {countries.map((country) => (
        <Country key={country.name} country={country} />
      ))}
    </>
  );
};

export default Countries;
