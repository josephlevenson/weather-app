import React from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';

export default function GraphList({ data, graphs }) {
    const formattedDataList = graphs.map(() => ({}));

    for (const { dt_txt, main } of data) {
        for (let i = 0; i < graphs.length; i++) {
            if (!main[graphs[i].dataProp]) {
                console.error(`Property ${graphs[i].dataProp} not found in response data`);
            } else {
                formattedDataList[i][dt_txt] = main[graphs[i].dataProp];
            }
        }
    }
    return (
        <div className="graph-container">
            {formattedDataList.map((chart, i) => (
                 !!Object.keys(chart).length && 
                    <div key={i}>
                        <h3>{graphs[i].title}</h3>
                        <LineChart data={chart} /> 
                    </div>
            ))}       
        </div>
    );
}