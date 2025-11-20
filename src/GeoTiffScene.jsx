import React, { useState, useEffect } from 'react';
import { fromUrl } from 'geotiff';
import { scaleLinear } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';
import SurfaceScene from './SurfaceScene';
import { extent } from 'd3-array';

const CHART_SIZE = 50;

const GeoTiffScene = () => {
  const [surfaceData, setSurfaceData] = useState(null);
  const [scales, setScales] = useState(null);

  useEffect(() => {
    const loadGeoTiff = async () => {
      try {
        const tiff = await fromUrl('http://localhost:5173/data/sado_dem.tif');
        const image = await tiff.getImage();
        const width = image.getWidth();
        const height = image.getHeight();
        const [values] = await image.readRasters();
        const noDataValue = image.getGDALNoData();

        // Filter out no-data values for accurate domain calculation
        const validValues = values.filter(v => v !== noDataValue);
        const yDomain = extent(validValues);

        // Replace no-data values with the minimum valid elevation for rendering
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
          yScale: scaleLinear().domain(data.yDomain).range([0, 5]), // Y軸のスケールを調整
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

  const colorScale = (value) => {
    if (!scales) return '#000000';
    const normalized = (value - scales.yScale.domain()[0]) / (scales.yScale.domain()[1] - scales.yScale.domain()[0]);
    return interpolateViridis(normalized);
  };

  if (!surfaceData || !scales) {
    return (
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }

  return (
    <SurfaceScene data={surfaceData} scales={scales} colorScale={colorScale} />
  );
};

export default GeoTiffScene;
