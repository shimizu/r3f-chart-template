import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { scaleLinear } from 'd3-scale';
import Axis from '../components/Axis';
import ScatterPoints from '../components/ScatterPoints';

// --- ヘルパー ---
const generateScatterData = (X_COUNT, Y_COUNT, Z_COUNT) => {
  const data = [];
  let id = 0;
  for (let i = 0; i < X_COUNT; i++) {
    for (let j = 0; j < Y_COUNT; j++) {
      for (let k = 0; k < Z_COUNT; k++) {
        data.push({
          x: i,
          y: Math.random() * 100, // Y軸の値をランダムにする
          z: k,
          id: id++,
        });
      }
    }
  }
  return data;
};

const ScatterPointsScene = ({ colorScale }) => {
  const X_COUNT = 10;
  const Y_COUNT = 10;
  const Z_COUNT = 10;
  const POINT_SIZE = 0.5;

  const data = React.useMemo(() => generateScatterData(X_COUNT, Y_COUNT, Z_COUNT), [X_COUNT, Y_COUNT, Z_COUNT]);

  const scales = React.useMemo(() => {
    const range = [-10, 10];
    const yRange = [0, 15]; // Y軸のスケールはBarChartSceneに合わせる

    return {
      xScale: scaleLinear().domain([0, X_COUNT - 1]).range(range),
      yScale: scaleLinear().domain([0, 100]).range(yRange),
      zScale: scaleLinear().domain([0, Z_COUNT - 1]).range(range),
      domain: {
        xMin: 0, xMax: X_COUNT - 1,
        yMin: 0, yMax: 100,
        zMin: 0, zMax: Z_COUNT - 1,
      }
    };
  }, [X_COUNT, Z_COUNT]);

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} intensity={1} castShadow />
      <OrbitControls makeDefault />
      <group>
        <Axis scales={scales} domain={scales.domain} />
        <ScatterPoints
          data={data}
          scales={scales}
          point_size={POINT_SIZE}
          colorScale={colorScale}
        />
      </group>
    </>
  );
};

export default ScatterPointsScene;
