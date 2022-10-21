import { useState, useEffect } from 'react'
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [newFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const filteredObjects = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      find countries<input value={newFilter} onChange={e => {setFilter(e.target.value)}} />
      <GetResult countries={filteredObjects} setFilter={setFilter}/>
    </div>
  )
}


const GetWeather = ({ country }) => {
  const [weather, setWeather] = useState({})
  const latlng = country.latlng
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
      .then(response => setWeather(response.data))
    }, [country]) 
  
  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {weather.main?.temp} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="weather"/>
      <div>wind {weather.wind?.speed} m/s</div>
    </div>
  )
}


const GetResult = ({ countries, setFilter }) => {
  if (countries.length > 10 ) return <div>Too many matches, specify another filter</div>
  if (countries.length === 1) {
    const country = countries[0]
    const langauges = country.languages
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>
          {Object.keys(langauges).map(key => <li key={langauges[key]}>{langauges[key]}</li>)} 
        </ul>
        <img src={country.flags.png} width="10%" height="10%" alt="flag"/>
        <GetWeather country={country}/>
      </div>
    )
  }
  return countries.map(country => {
    return (
      <div key={country.name.common}>
        {country.name.common}
        <button value={country.name.common} onClick={(e) => setFilter(e.target.value)}>show</button>
      </div>
    )
  })
}


export default App