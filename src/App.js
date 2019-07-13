import React, { useState, Fragment } from 'react';
import QueryForm from './components/QueryForm'
import GraphList from './components/GraphList';
import './App.css';

// Graph config object list, adding to this array will generate other graphs
const graphs = [
  {
    title: 'Temperature',
    dataProp: 'temp'
  },
  {
    title: 'Humidity',
    dataProp: 'humidity'
  },
  {
    title: 'Pressure',
    dataProp: 'pressure'
  }
]

function App() {
  const [ weatherData, updateWeatherData ] = useState();
  const [ isError, updateIsError ] = useState(false);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather app</h1>
      </header>
      <main className="main-container">
        <QueryForm onUpdate={updateWeatherData} onError={updateIsError} />
        {isError && <h2 className="error-text">Oops! Looks like something went wrong</h2>}
        {!!weatherData && !isError && 
          <Fragment>
            <h2>Here's the forecast for {weatherData.city.name}</h2>
            <GraphList graphs={graphs} data={weatherData.list} />
          </Fragment>
        }
      </main>
    </div>
  );
}

export default App;
