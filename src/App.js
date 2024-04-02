import React, { useEffect, useState } from "react";
import { wineDataSet } from "./data";
import "./App.css";

function App() {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const calculateStatistics = (attribute) => {
      const values = wineDataSet.map((data) => data[attribute]);
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
      const sortedValues = values.slice().sort((a, b) => a - b);
      const median =
        (sortedValues[(sortedValues.length - 1) >> 1] +
          sortedValues[sortedValues.length >> 1]) /
        2;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const stdDev = Math.sqrt(
        values.reduce((acc, val) => acc + (val - mean) ** 2, 0) / values.length
      );
      const quartile1 = sortedValues[Math.floor(sortedValues.length / 4)];
      const quartile3 = sortedValues[Math.ceil((sortedValues.length * 3) / 4)];

      return {
        mean,
        median,
        min,
        max,
        stdDev,
        quartile1,
        quartile3,
      };
    };

    const stats = {};
    for (const attribute in wineDataSet[0]) {
      stats[attribute] = calculateStatistics(attribute);
    }
    setStatistics(stats);
  }, []);

  return (
    <div className="App">
      <h1>Wine Data Statistics</h1>
      <div className="statistics">
        {Object.entries(statistics).map(([attribute, values]) => (
          <div key={attribute}>
            <h3>{attribute}</h3>
            <ul>
              <li>Mean: {values.mean}</li>
              <li>Median: {values.median}</li>
              <li>Min: {values.min}</li>
              <li>Max: {values.max}</li>
              <li>Standard Deviation: {values.stdDev}</li>
              <li>Quartile 1: {values.quartile1}</li>
              <li>Quartile 3: {values.quartile3}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
