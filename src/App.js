import React, { useState, Fragment } from 'react';
import QueryForm from './components/QueryForm'
import GraphList from './components/GraphList';
import './App.css';

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather app</h1>
      </header>
      <main className="main-container">
        <QueryForm onUpdate={updateWeatherData} />
        {!!weatherData && 
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
