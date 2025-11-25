import { useState, useEffect } from 'react';
import { csv } from 'd3-fetch';
import { scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';

export const useCsvData = (url) => {
  const [data, setData] = useState({ surfaceData: null, scales: null, colorScale: null });

  useEffect(() => {
    if (url) {
      csv(url).then(parsedData => {
        const columns = parsedData.columns.slice(1);
        const width = columns.length;
        const height = parsedData.length;

        const values = [];
        let min = Infinity;
        let max = -Infinity;

        parsedData.forEach(row => {
          columns.forEach(col => {
            const value = +row[col];
            values.push(value);
            if (value < min) min = value;
            if (value > max) max = value;
          });
        });

        const surfaceData = {
          width,
          height,
          values,
          min,
          max,
          widthSegments: width - 1,
          heightSegments: height - 1,
        };
        
        const xzRange = [-15, 15];
        const yRange = [0, 10];

        const scales = {
          xScale: scaleLinear().domain([0, width - 1]).range(xzRange),
          yScale: scaleLinear().domain([min, max]).range(yRange),
          zScale: scaleLinear().domain([0, height - 1]).range(xzRange),
          domain: {
            xMin: 0, xMax: width - 1,
            yMin: min, yMax: max,
            zMin: 0, zMax: height - 1,
          }
        };

        const colorScale = scaleSequential([min, max], interpolateTurbo);

        setData({ surfaceData, scales, colorScale });
      });
    }
  }, [url]);

  return data;
};

