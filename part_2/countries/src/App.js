import React, { useEffect, useState } from "react";
import axios from "axios";
import Display from "./components/Display";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const displayCountries = filterName
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(filterName)
      )
    : countries;
  console.log(displayCountries);
  return (
    <>
      <Filter setFilterName={setFilterName} />
      <Display countries={displayCountries} setFilterName={setFilterName} />
    </>
  );
}

export default App;
