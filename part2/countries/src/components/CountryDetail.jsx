import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital]);

  console.log("detail country:", country);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" width="400px" />
      {weather ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <b>temperature: </b> <div>{weather.current.temperature} Celsius</div>
          <img src={weather.current.weather_icons[0]} alt="weather icon" />
          <div>
            <b>wind: </b>
            <span>
              {weather.current.wind_speed} mph direction{" "}
              {weather.current.wind_dir}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CountryDetail;
