import React, { Component } from 'react';
import { getForecastByCity, getForecastByCoordinates } from '../api/forecast'

const QUERY_TYPES = {
    CITY: 'city',
    COORDINATES: 'coordinates'
};

export default class QueryForm extends Component {
    state = {}
    
    setField = (field) => (e) => {
        this.setState({ [field]: e.target.value })
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                this.getData(QUERY_TYPES.COORDINATES, `${latitude},${longitude}`);
            })
        }
    }

    getData = async (queryType, query) => {
        let data;
        if (queryType === QUERY_TYPES.CITY) {
            data = await getForecastByCity(query);
        } else if (queryType === QUERY_TYPES.COORDINATES) {
            data = await getForecastByCoordinates(query.split(','));
        }
        this.props.onUpdate(data);
    };

    render() {
        const { query, queryType } = this.state;

        return (
            <div className="form-container">
                <label className="form-label" htmlFor="query-form">Search by</label>
                <select defaultValue="" className="form-input" onChange={this.setField('queryType')} id="query-form">
                    <option value="" disabled hidden>City or coordinates</option>
                    <option value={QUERY_TYPES.CITY}>City</option>
                    <option value={QUERY_TYPES.COORDINATES}>Coordinates</option>
                </select>
                <label htmlFor="query" className="form-label">Search for your location</label>
                <input id="query" className="form-input" type="text" onChange={this.setField('query')} />
                <button className="button" disabled={!queryType || !query} onClick={() => this.getData(queryType, query)}>Let's go!</button>
            </div>
        ); 
    }  
}