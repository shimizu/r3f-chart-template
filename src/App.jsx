import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { scaleLinear } from 'd3-scale';
import { csv } from 'd3-fetch';
import { extent } from 'd3-array';

import SurfaceScene from './SurfaceScene';
import Legend from './components/Legend';
import './App.css';

// --- 定数 ---
const CHART_WIDTH = 20;
const CHART_HEIGHT = 20;
//const COLOR_SCALE_RANGE = ['#4ade80', '#06d6a0', '#118ab2', '#073b4c', '#ffd166'];
const COLOR_SCALE_RANGE = ['blue', 'purple', 'red', 'orange', 'yellow'];


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
    const domain = scales.yScale.domain();
    const domainStops = COLOR_SCALE_RANGE.map((c, i) => {
      const t = i / (COLOR_SCALE_RANGE.length - 1);
      return domain[0] * (1 - t) + domain[1] * t;
    });
    console.log(scales.yScale.ticks())
    return scaleLinear().domain(scales.yScale.ticks()).range(COLOR_SCALE_RANGE);
  }, [scales]);

  return (
    <>
      <div className="info-panel">
        <h1>R3F 3D Surface Plot</h1>
        <p>
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
