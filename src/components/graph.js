import React from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';

export default function Graph({ data }) {
    console.log(data)
    const graphData = {};
    for (const { dt_txt, main: { temp } } of data) {
        graphData[dt_txt] = temp
    }
    return (
        <div className="graph-container">
            <LineChart data={graphData} />            
        </div>
    );
}