import React from "react";
import Countries from "./Countries";
import CountryDetail from "./CountryDetail";

const Display = ({ countries, setFilterName }) => {
  return (
    <div>
      {countries.length > 10 ? (
        "Too many matches,specify another filter."
      ) : countries.length > 1 ? (
        <Countries countries={countries} setFilterName={setFilterName} />
      ) : countries.length === 1 ? (
        <CountryDetail country={countries[0]} />
      ) : (
        "Nothing match filter."
      )}
    </div>
  );
};

export default Display;
