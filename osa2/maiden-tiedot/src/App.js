import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  
  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all').then(result => {
      setCountries(result.data)
    }).catch(error => {
      alert(`something went wrong: ${error}`)
    })
  }, [])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleOpenCountry = (e, country) => {
    setSearchQuery(country)
  }

  const filteredCountries = searchQuery.length > 0
    ? countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : countries

    return (
      <div>
        <Search handleSearchChange={handleSearchChange} />
  
        <Countries countries={filteredCountries} handleOpenCountry={handleOpenCountry} />
      </div>
    )
}

const Search = (props) => {
  return (
    <>
      find countries <input onChange={props.handleSearchChange} />
    </>
  )
}

const Countries = ({countries, handleOpenCountry}) => {
  if(countries.length > 10) {
    return <p>Too many results, specify another filter</p>
  }

  if(countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {
        countries.map((country) =>
          <p key={country.name}>
            {country.name}
            <button onClick={(e) => handleOpenCountry(e, country.name)}>show</button>
          </p>
        )
      }
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {
          country.languages.map((language) => 
            <li key={language.name}>{language.name}</li>
          )
        }
      </ul>

      <img src={country.flag} alt={country.name} width="100px" />

      <h2>Weather in {country.capital}</h2>
      <Weather city={country.capital} />
    </div>
  )
}

const Weather = ({city}) => {
  const [ weather, setWeather ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    Axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`).then(response => {
      setWeather(response.data)
    }).catch(error => {
      alert(`something went wrong: ${error}`)
    })
  }, [city, api_key])

  if(weather.current === undefined) {
    return <p>Loading</p>
  }

  return (
    <div>
      <p>
        <b>temperature: </b>
        {weather.current.temperature}
      </p>
      <p>
        <b>wind: </b>
        {weather.current.wind_speed} km/h {weather.current.wind_dir}
      </p>
      <img src={weather.current.weather_icons[0]} alt="Weather icon" />
    </div>
  )
}

export default App