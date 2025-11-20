import React, { useMemo } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { scaleLinear } from 'd3-scale';
import Axis from './components/Axis';
import ScatterPoints from './components/ScatterPoints';

// --- 定数とヘルパー ---
const POINT_SIZE = 0.1;
const COLOR_RANGE = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#1a535c', '#ff9f1c'];

// ランダムデータの生成
const generateData = (count = 100) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      id: i,
    });
  }
  return data;
};

function Scene(){
    const data = useMemo(() => generateData(100), []);

    const scales = useMemo(() => {
        const range = [-10, 10]; 

        return {
        xScale: scaleLinear().domain([0, 100]).range(range),
        yScale: scaleLinear().domain([0, 100]).range(range),
        zScale: scaleLinear().domain([0, 100]).range(range),
        domain: {
            xMin: 0, xMax: 100,
            yMin: 0, yMax: 100,
            zMin: 0, zMax: 100
        }
        };
    }, [data]);


    return (
        <>
            <color attach="background" args={['#f0f0f0']} />
            
            <Environment preset="city" background />
            
            <OrbitControls makeDefault />

            <group>
                <Axis scales={scales} domain={scales.domain} />
                <ScatterPoints data={data} scales={scales} point_size={POINT_SIZE} color_range={COLOR_RANGE} />
            </group>
        </>
    )
}

export default Scene