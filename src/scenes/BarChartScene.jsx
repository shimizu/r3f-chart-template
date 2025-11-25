import React, { useMemo, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { scaleLinear } from 'd3-scale';
import Axis from '../components/Axis';
import Bar from '../components/Bar';

// --- 定数 ---
const X_COUNT = 10;
const Z_COUNT = 10;

// --- ヘルパー ---
// 棒グラフ用のデータを生成
const generateBarData = () => {
  const data = [];
  let id = 0;
  for (let i = 0; i < X_COUNT; i++) {
    for (let j = 0; j < Z_COUNT; j++) {
      data.push({
        x: i,
        y: Math.random() * 100,
        z: j,
        id: id++,
      });
    }
  }
  return data;
};

function BarChartScene({ colorScale, onScalesReady }) {
  useEffect(() => {
    onScalesReady(null);
  }, [onScalesReady]);

  const data = useMemo(() => generateBarData(), []);

  const scales = useMemo(() => {
    const range = [-10, 10];
    const yRange = [0, 15];

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
  }, []);

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} intensity={1} castShadow />
      
      <OrbitControls makeDefault />

      <group>
        <Axis scales={scales} domain={scales.domain} />
        <Bar data={data} scales={scales} colorScale={colorScale} />
      </group>
    </>
  );
}

export default BarChartScene;
