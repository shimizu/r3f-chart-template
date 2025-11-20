import React from 'react';
import { Canvas } from '@react-three/fiber';

import { useGeoTiff } from './hooks/useGeoTiff';
import SurfaceScene from './SurfaceScene';
import Legend from './components/Legend';
import './App.css';

function App() {
  const { surfaceData, scales, colorScale } = useGeoTiff('/data/sado_dem.tif');

  return (
    <>
      <div className="info-panel">
        <h1>GeoTIFF 3D Surface</h1>
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
        <SurfaceScene data={surfaceData} scales={scales} colorScale={colorScale} />
      </Canvas>

      <Legend yScale={scales?.yScale} colorScale={colorScale} />
    </>
  );
}

export default App;
