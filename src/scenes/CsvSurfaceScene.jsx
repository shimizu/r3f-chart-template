import React, { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useCsvData } from '../hooks/useCsvData';
import Surface from '../components/Surface';
import Axis from '../components/Axis';

const CsvSurfaceScene = ({ onScalesReady }) => {
  const { surfaceData, scales, colorScale } = useCsvData('data/mt_bruno_elevation.csv');

  useEffect(() => {
    if (scales && colorScale) {
      onScalesReady({ yScale: scales.yScale, colorScale });
    }
    // コンポーネントがアンマウントされるときにLegendをクリアする
    return () => {
      onScalesReady(null);
    };
  }, [scales, colorScale, onScalesReady]);

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
          domain={scales.domain}
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
