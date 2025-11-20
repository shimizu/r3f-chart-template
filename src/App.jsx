import React from 'react';
import { Canvas } from '@react-three/fiber';
import GeoTiffScene from './GeoTiffScene';
import './App.css';

function App() {
  return (
    <>
      <div className="info-panel">
        <h1>GeoTIFF 3D Surface Test</h1>
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
        <GeoTiffScene />
      </Canvas>
    </>
  );
}

export default App;
