import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { scaleLinear } from 'd3-scale';
import { csv } from 'd3-fetch';
import { extent } from 'd3-array';
import chroma from 'chroma-js';

import SurfaceScene from './SurfaceScene';
import Legend from './components/Legend';
import './App.css';

// --- 定数 ---
const CHART_WIDTH = 20;
const CHART_HEIGHT = 20;
const COLOR_SCALE_RANGE = ['#000080', '#800080', '#ff0000', '#ffa500', '#ffff00'];

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv('/data/mt_bruno_elevation.csv').then(rows => {
      const values = [];
      rows.forEach(row => {
        Object.values(row).slice(1).forEach(val => {
          values.push(parseFloat(val));
        });
      });

      const widthSegments = rows[0] ? Object.keys(rows[0]).length - 2 : 0;
      const heightSegments = rows.length - 1;

      setData({
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
        widthSegments: widthSegments,
        heightSegments: heightSegments,
        values: values,
        yDomain: extent(values)
      });
    });
  }, []);

  const scales = useMemo(() => {
    if (!data) return null;
    const yRange = [0, 15];
    return {
      xScale: scaleLinear().domain([0, data.widthSegments]).range([-CHART_WIDTH / 2, CHART_WIDTH / 2]),
      yScale: scaleLinear().domain(data.yDomain).range(yRange),
      zScale: scaleLinear().domain([0, data.heightSegments]).range([-CHART_HEIGHT / 2, CHART_HEIGHT / 2]),
      domain: {
        xMin: 0, xMax: data.widthSegments,
        yMin: data.yDomain[0], yMax: data.yDomain[1],
        zMin: 0, zMax: data.heightSegments,
      }
    };
  }, [data]);

  const colorScale = useMemo(() => {
    if (!scales) return null;
    return chroma.scale(COLOR_SCALE_RANGE).domain(scales.yScale.domain());
  }, [scales]);

  return (
    <>
      <div className="absolute top-4 left-4 z-10 p-4 bg-white/80 rounded shadow pointer-events-none">
        <h1 className="text-xl font-bold mb-2">R3F 3D Surface Plot</h1>
        <p className="text-sm text-gray-600">
          Left Click: Rotate<br/>
          Right Click: Pan<br/>
          Scroll: Zoom
        </p>
      </div>
      
      <Canvas 
        shadows
        camera={{
          position: [20, 20, 30],
          fov: 45
        }}
      >
        <SurfaceScene data={data} scales={scales} colorScale={colorScale} />
      </Canvas>

      <Legend yScale={scales?.yScale} colorScale={colorScale} />
    </>
  );
}

export default App;
