import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (filter) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          setCountries(filteredCountries)
        })
    }
  }, [filter])

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data:', error)
          setWeather(null)
        })
    }
  }, [selectedCountry, WEATHER_API_KEY])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>capital {selectedCountry.capital}</p>
          <p>area {selectedCountry.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <p>
            <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="100" />
          </p>
          {weather ? (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>temperature {weather.main.temp} Celcius</p>
              <p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </p>
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
          <button onClick={() => setSelectedCountry(null)}>Back</button>
        </div>
      ) : countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countries.length > 1 ? (
        <ul>
          {countries.map(country => (
            <li key={country.cca3}>
              {country.name.common} <button onClick={() => handleCountryClick(country)}>show</button>
            </li>
          ))}
        </ul>
      ) : countries.length === 1 ? (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>capital {countries[0].capital}</p>
          <p>area {countries[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(countries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <p>
            <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} width="100" />
          </p>
          {weather ? (
            <div>
              <h3>Weather in {countries[0].capital}</h3>
              <p>temperature {weather.main.temp} Celcius</p>
              <p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </p>
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      ) : (
        <div>No matches</div>
      )}
    </div>
  )
}

export default App