import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';

import { useGeoTiff } from './hooks/useGeoTiff';
import GeoTiffSurfaceScene from './scenes/GeoTiffSurfaceScene';
import BarChartScene from './scenes/BarChartScene';
import ScatterPointsScene from './scenes/ScatterPointsScene';
import CsvSurfaceScene from './scenes/CsvSurfaceScene'; // CsvSurfaceSceneをインポート
import Legend from './components/Legend';
import './App.css';

function App() {
  const [chartType, setChartType] = useState('surface');

  // SurfaceChart用のデータとスケール
  const { surfaceData, scales, colorScale: surfaceColorScale } = useGeoTiff('./data/sado_dem.tif');

  // BarChartとScatterChart用の汎用カラースケール
  const genericColorScale = useMemo(() => {
    return scaleSequential([0, 100], interpolateTurbo);
  }, []);

  return (
    <>
      <div className="app-header">
        <h1 className="app-title">3D Chart Demo</h1>
        <p className="info-text">
          Left Click: Rotate<br/>
          Right Click: Pan<br/>
          Scroll: Zoom
        </p>
        <div className="chart-selector">
          <button onClick={() => setChartType('surface')} disabled={chartType === 'surface'}>
            GeoTIFF Surface
          </button>
          <button onClick={() => setChartType('csv-surface')} disabled={chartType === 'csv-surface'}>
            CSV Surface
          </button>
          <button onClick={() => setChartType('bar')} disabled={chartType === 'bar'}>
            Bar Chart
          </button>
          <button onClick={() => setChartType('scatter')} disabled={chartType === 'scatter'}>
            Scatter Chart
          </button>
        </div>
      </div>
      
      <Canvas 
        shadows
        camera={{
          position: [20, 20, 30],
          fov: 45
        }}
      >
        {chartType === 'surface' && (
          <GeoTiffSurfaceScene data={surfaceData} scales={scales} colorScale={surfaceColorScale} />
        )}
        {chartType === 'csv-surface' && (
          <CsvSurfaceScene />
        )}
        {chartType === 'bar' && (
          <BarChartScene colorScale={genericColorScale} />
        )}
        {chartType === 'scatter' && (
          <ScatterPointsScene colorScale={genericColorScale} />
        )}
      </Canvas>

      {chartType === 'surface' && (
        <Legend yScale={scales?.yScale} colorScale={surfaceColorScale} />
      )}
    </>
  );
}

export default App;
