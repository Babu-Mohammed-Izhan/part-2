import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        const data = res.data
        setCountries(data)
      }
      )
  }, [])

  const [weather, setWeather] = useState([])
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleFilter = (event) => {
    setSearch(event.target.value)
  }

  const copy = countries;

  const filteredCountries = search !== '' ? copy.filter(country => { return country.name.toLowerCase().includes(search.toLowerCase()) }) : copy

  const handleView = (event) => {
    const country = event.target.value
    setSearch(country)
  }

  return (
    <div className="App">
      <h3>find countries <input value={search} onChange={handleFilter} /> </h3>
      {filteredCountries.length > 10 ? <h3>Too many matches,specify another filter</h3> : filteredCountries.map((country) => {
        if (filteredCountries.length > 1) {
          return (<div key={country.name}><h3 key={country.capital}>{country.name}</h3><button onClick={handleView} key={country.population} value={country.name}>show</button></div>)
        } else {
          const params = { access_key: process.env.REACT_APP_API_KEY, query: country.capital }
          axios.get('http://api.weatherstack.com/current', { params })
            .then(response => {
              const data = response.data;
              console.log(data)
              setWeather(data);
            }).catch(error => {
              console.log(error);
            });
          return (
            <div key={country.name}>
              <h3>{country.name}</h3>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
              <div>Languages:
                <ul>{country.languages.map(lang => { return (<li key={lang.name}>{lang.name}</li>) })}
                </ul>
              </div>
              <img src={country.flag} alt="" style={{ width: "100px", height: "100px" }} />
              <div>
                <h3>Weather in {country.capital}</h3>
                <p>temperature:{weather.temperature} Celcius</p>
                <img src={weather.weather_icons} alt="" />
                <p>wind:{weather.wind_speed} mph direction {weather.wind_dir}</p>
              </div>
            </div>)
        }
      })}
    </div>
  );
}

export default App;
