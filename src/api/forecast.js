import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants'

export const getForecastByCity = async (cityName) => {
   return (await axios.get(BASE_URL, { params: { q: `${cityName},us`, APPID: API_KEY, mode: 'json' } })).data;
}

export const getForecastByCoordinates = async ([lat = '', lon = '']) => {
    return (await axios.get(BASE_URL, { params: { lat: lat.trim(), lon: lon.trim(), APPID: API_KEY, mode: 'json' }})).data;
}

export const getForecastByZip = async (zip) => {
    return (await axios.get(BASE_URL, { params: { zip: `${zip},us`, APPID: API_KEY, mode: 'json' }})).data;
}