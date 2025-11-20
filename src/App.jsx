import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { fromUrl } from 'geotiff';
import { scaleLinear } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';
import { extent } from 'd3-array';

import SurfaceScene from './SurfaceScene';
import Legend from './components/Legend';
import './App.css';

const CHART_SIZE = 50;

function App() {
  const [surfaceData, setSurfaceData] = useState(null);
  const [scales, setScales] = useState(null);

  useEffect(() => {
    const loadGeoTiff = async () => {
      try {
        const tiff = await fromUrl('/data/sado_dem.tif'); // Use relative path
        const image = await tiff.getImage();
        const width = image.getWidth();
        const height = image.getHeight();
        const [values] = await image.readRasters();
        const noDataValue = image.getGDALNoData();

        const validValues = values.filter(v => v !== noDataValue);
        const yDomain = extent(validValues);

        const processedValues = values.map(v => (v === noDataValue ? yDomain[0] : v));

        const aspectRatio = width / height;
        const chartWidth = aspectRatio >= 1 ? CHART_SIZE : CHART_SIZE * aspectRatio;
        const chartHeight = aspectRatio >= 1 ? CHART_SIZE / aspectRatio : CHART_SIZE;

        const data = {
          width: chartWidth,
          height: chartHeight,
          widthSegments: width - 1,
          heightSegments: height - 1,
          values: processedValues,
          yDomain: yDomain,
        };
        setSurfaceData(data);

        const newScales = {
          xScale: scaleLinear().domain([0, data.widthSegments]).range([-data.width / 2, data.width / 2]),
          yScale: scaleLinear().domain(data.yDomain).range([0, 5]),
          zScale: scaleLinear().domain([0, data.heightSegments]).range([-data.height / 2, data.height / 2]),
          domain: {
            xMin: 0, xMax: data.widthSegments,
            yMin: data.yDomain[0], yMax: data.yDomain[1],
            zMin: 0, zMax: data.heightSegments,
          }
        };
        setScales(newScales);

      } catch (error) {
        console.error('Error loading GeoTIFF:', error);
      }
    };

    loadGeoTiff();
  }, []);

  const colorScale = useMemo(() => {
    if (!scales) return null;
    const domain = scales.yScale.domain();
    const range = scales.yScale.ticks(10).map(t => {
      const normalized = (t - domain[0]) / (domain[1] - domain[0]);
      return interpolateViridis(normalized);
    });
    return scaleLinear().domain(scales.yScale.ticks(10)).range(range).clamp(true);
  }, [scales]);

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
