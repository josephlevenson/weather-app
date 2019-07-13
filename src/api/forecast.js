import axios from 'axios';
import { API_KEY } from '../constants'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getForecastByCity = async (cityName) => {
    try {
        return (await axios.get(BASE_URL, { params: { q: `${cityName},us`, APPID: API_KEY, mode: 'json' } })).data
    } catch (e) {
        console.log(e);
    }
}

export const getForecastByCoordinates = async ([lat, lon]) => {
    try {
        return (await axios.get(BASE_URL, { params: { lat, lon , APPID: API_KEY, mode: 'json' }})).data
    } catch (e) {
        console.log(e)
    }
}