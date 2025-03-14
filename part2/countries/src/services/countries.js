import axios from 'axios'

const allCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const specificCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAllCountries = () => {
    return axios.get(allCountries)
}

const getCountry = (country) => {
    return axios.get(specificCountry + country)
}

export default {
    getAll: getAllCountries,
    get: getCountry
}