import React, { PureComponent } from 'react';
import { getForecastByCity, getForecastByCoordinates, getForecastByZip } from '../api/forecast'

const QUERY_TYPES = {
    CITY: 'city',
    COORDINATES: 'coordinates',
    ZIP: 'zip'
};

export default class QueryForm extends PureComponent {
    state = {}
    
    setField = (field) => (e) => {
        this.setState({ [field]: e.target.value })
    }

    componentDidMount() {
        // Get user's initial location and fire off an API call based on the coordinates
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                this.getData(QUERY_TYPES.COORDINATES, `${latitude},${longitude}`);
            })
        }
    }

    getData = async (queryType, query) => {
        let data;
        try {
            if (queryType === QUERY_TYPES.CITY) {
                data = await getForecastByCity(query);
            } else if (queryType === QUERY_TYPES.COORDINATES) {
                data = await getForecastByCoordinates(query.split(','));
            } else if (queryType === QUERY_TYPES.ZIP) {
                data = await getForecastByZip(query);
            }
            this.props.onUpdate(data);
            this.props.onError(false);
        } catch (e) {
            this.props.onError(true);
        }
    };

    render() {
        const { query, queryType } = this.state;

        return (
            <div className="form-container">
                <label className="form-label" htmlFor="query-form">Search by</label>
                <select defaultValue="" className="form-input" onChange={this.setField('queryType')} id="query-form">
                    <option value="" disabled hidden>City, coordinates, or zip</option>
                    <option value={QUERY_TYPES.CITY}>City</option>
                    <option value={QUERY_TYPES.COORDINATES}>Coordinates</option>
                    <option value={QUERY_TYPES.ZIP}>Zip Code</option>
                </select>
                <label htmlFor="query" className="form-label">Search for your location</label>
                <input id="query" className="form-input" type="text" onChange={this.setField('query')} />
                <button className="button" disabled={!queryType || !query} onClick={() => this.getData(queryType, query)}>
                    Let's go!
                </button>
            </div>
        ); 
    }  
}