import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div >
      <p>
        {country.name}
        <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      </p>
      {show && <CountryDetail country={country} />}
    </div>
  );
};

export default Country;
