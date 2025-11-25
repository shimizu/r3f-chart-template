import React, { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';
import { useCsvData } from '../hooks/useCsvData';
import Surface from '../components/Surface';
import Axis from '../components/Axis';

const CsvSurfaceScene = () => {
  const surfaceData = useCsvData('./data/mt_bruno_elevation.csv');

  const { scales, colorScale } = useMemo(() => {
    if (!surfaceData) return { scales: null, colorScale: null };

    const { width, height, min, max } = surfaceData;
    const xzRange = [-15, 15];
    const yRange = [0, 10];

    const scales = {
      xScale: scaleLinear().domain([0, width - 1]).range(xzRange),
      yScale: scaleLinear().domain([min, max]).range(yRange),
      zScale: scaleLinear().domain([0, height - 1]).range(xzRange),
    };

    const colorScale = scaleSequential([min, max], interpolateTurbo);

    return { scales, colorScale };
  }, [surfaceData]);

  if (!surfaceData || !scales) {
    return null; // データが読み込まれるまで何も表示しない
  }

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} castShadow />
      <OrbitControls makeDefault />
      
      <group>
        <Axis 
          scales={scales}
          domain={{
            xMin: 0, xMax: surfaceData.width - 1,
            yMin: surfaceData.min, yMax: surfaceData.max,
            zMin: 0, zMax: surfaceData.height - 1,
          }}
        />
        <Surface 
          data={surfaceData}
          scales={scales}
          colorScale={colorScale}
        />
      </group>
    </>
  );
};

export default CsvSurfaceScene;
