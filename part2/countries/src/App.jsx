import {useEffect, useState} from 'react'
import countriesService from './services/countries'

const Input = ({search, handleSearchChange}) => {
    return (
        <div>
            find countries <input value={search} onChange={handleSearchChange}/>
        </div>
    )
}

const FilteredCountries = ({countries, onCountryClick, onHideClick, api_key}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <ShowCountry country={countries[0]} onHideClick={onHideClick} api_key={api_key} hasUsedButton={false}/>
        )
    } else {
        return (
            <Countries countries={countries} onCountryClick={onCountryClick}/>
        )
    }
}

const ShowCountry = ({country, onHideClick, api_key, hasUsedButton}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            {hasUsedButton && <button onClick={onHideClick}>Hide</button>}
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((language) => {
                    return (
                        <li key={language}>{language}</li>
                    )
                })}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="200px"/>
            <ShowCountryWeather country={country} api_key={api_key}></ShowCountryWeather>
        </div>
    )
}

const Countries = ({countries, onCountryClick}) => {
    return (
        <div>
            {countries.map((country) => {
                return (
                    <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => onCountryClick(country)}>Show</button>
                    </div>
                )
            })}
        </div>
    )
}

const ShowCountryWeather = ({country, api_key}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                setWeather(data);
            })
    }, [country, api_key]);

    if (!weather) {
        return <div>Loading weather data...</div>;
    }

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                 alt={weather.weather[0].description}/>
            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        </div>
    );
}

const App = () => {
    const api_key = import.meta.env.VITE_API_KEY
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const handleHideClick = () => {
        setSelectedCountry(null);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setSelectedCountry(null)
        setFilteredCountries(countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }


    useEffect(() => {
        countriesService.getAll()
            .then((response) => {
                setCountries(response.data)
            })
    }, [])

    return (
        <>
            <Input search={search} handleSearchChange={handleSearchChange}/>
            <FilteredCountries countries={filteredCountries} onCountryClick={handleCountryClick}
                               onHideClick={handleHideClick} api_key={api_key}/>
            {selectedCountry &&
                <ShowCountry country={selectedCountry} onHideClick={handleHideClick} api_key={api_key} hasUsedButton={true}/>}
        </>

    )
}

export default App