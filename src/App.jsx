import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';

import { useGeoTiff } from './hooks/useGeoTiff';
import { useCsvData } from './hooks/useCsvData'; // useCsvData をインポート
import GeoTiffSurfaceScene from './scenes/GeoTiffSurfaceScene';
import BarChartScene from './scenes/BarChartScene';
import ScatterPointsScene from './scenes/ScatterPointsScene';
import CsvSurfaceScene from './scenes/CsvSurfaceScene';
import Legend from './components/Legend';
import './App.css';

function App() {
  const [chartType, setChartType] = useState('surface');

  // 各チャート用のデータをここで取得
  const { scales: geoTiffScales, colorScale: geoTiffColorScale } = useGeoTiff('./data/sado_dem.tif') || {};
  const { scales: csvScales, colorScale: csvColorScale } = useCsvData('./data/mt_bruno_elevation.csv') || {};

  // BarChartとScatterChart用の汎用カラースケール
  const genericColorScale = useMemo(() => {
    return scaleSequential([0, 100], interpolateTurbo);
  }, []);

  // 表示するLegendのスケールを決定
  const legendScales = {
    'surface': { yScale: geoTiffScales?.yScale, colorScale: geoTiffColorScale },
    'csv-surface': { yScale: csvScales?.yScale, colorScale: csvColorScale },
  }[chartType];

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
          <GeoTiffSurfaceScene />
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

      {legendScales && (
        <Legend yScale={legendScales.yScale} colorScale={legendScales.colorScale} />
      )}
    </>
  );
}

export default App;
