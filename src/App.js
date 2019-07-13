import React, { useState } from 'react';
import QueryForm from './components/form'
import Graph from './components/graph';
import './App.css';

function App() {
  const [ weatherData, updateWeatherData ] = useState();
  console.log('weatherData', weatherData)
  return (
    <div className="App">
      <header className="App-header">
        <p>Weather app</p>
      </header>
      <main>
        <QueryForm onUpdate={updateWeatherData} />
        {!!weatherData && <Graph data={weatherData} />}
      </main>
    </div>
  );
}

export default App;
