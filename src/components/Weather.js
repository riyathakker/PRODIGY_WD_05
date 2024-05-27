import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "your_api_key";
  
  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
      return;
    } 
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather({ cod: "404", message: "City not found" });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
        <button className="getweather" onClick={weatherData}>
          Submit
        </button>
      </form>
      {weather && (
        <DisplayWeather data={weather} />
      )}
    </div>
  );
}

export default Weather;
