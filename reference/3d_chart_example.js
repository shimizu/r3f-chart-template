import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

// --- 定数とヘルパー ---
const POINT_SIZE = 0.5;
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

// --- Axis コンポーネント ---
const Axis = ({ scales, domain }) => {
  const { xScale, yScale, zScale } = scales;
  const { xMin, xMax, yMin, yMax, zMin, zMax } = domain;

  const axisColor = "black";
  const gridColor = "#cccccc";

  // D3のscale.ticks()を使用
  const xTicks = xScale.ticks(5);
  const yTicks = yScale.ticks(5);
  const zTicks = zScale.ticks(5);

  return (
    <group>
      {/* --- X軸 --- */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              xScale(xMin), yScale(yMin), zScale(zMin),
              xScale(xMax), yScale(yMin), zScale(zMin)
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={axisColor} />
      </line>
      {xTicks.map((tick, i) => (
        <group key={`x-${i}`} position={[xScale(tick), yScale(yMin), zScale(zMin)]}>
          {/* Grid Line */}
          <line position={[0, 0, (zScale(zMax) - zScale(zMin)) / 2]}>
             <bufferGeometry>
               <bufferAttribute
                 attach="attributes-position"
                 count={2}
                 array={new Float32Array([
                   0, 0, - (zScale(zMax) - zScale(zMin)) / 2,
                   0, 0, (zScale(zMax) - zScale(zMin)) / 2
                 ])}
                 itemSize={3}
               />
            </bufferGeometry>
            <lineBasicMaterial color={gridColor} transparent opacity={0.5} />
          </line>
          {/* Label */}
          <Text
            position={[0, -2, 0]}
            fontSize={2}
            color="black"
            anchorX="center"
            anchorY="top"
          >
            {tick}
          </Text>
        </group>
      ))}
      <Text position={[xScale(xMax) + 5, yScale(yMin), zScale(zMin)]} fontSize={3} color="black">X</Text>


      {/* --- Y軸 --- */}
      <line>
        <bufferGeometry>
           <bufferAttribute
             attach="attributes-position"
             count={2}
             array={new Float32Array([
               xScale(xMin), yScale(yMin), zScale(zMin),
               xScale(xMin), yScale(yMax), zScale(zMin)
             ])}
             itemSize={3}
           />
        </bufferGeometry>
        <lineBasicMaterial color={axisColor} />
      </line>
      {yTicks.map((tick, i) => (
        <group key={`y-${i}`} position={[xScale(xMin), yScale(tick), zScale(zMin)]}>
           {/* Grid Line */}
           <line position={[(xScale(xMax) - xScale(xMin)) / 2, 0, 0]}>
             <bufferGeometry>
               <bufferAttribute
                 attach="attributes-position"
                 count={2}
                 array={new Float32Array([
                   -(xScale(xMax) - xScale(xMin)) / 2, 0, 0,
                    (xScale(xMax) - xScale(xMin)) / 2, 0, 0
                 ])}
                 itemSize={3}
               />
            </bufferGeometry>
            <lineBasicMaterial color={gridColor} transparent opacity={0.5} />
          </line>
          {/* Label */}
          <Text
            position={[-3, 0, 0]}
            fontSize={2}
            color="black"
            anchorX="right"
            anchorY="middle"
          >
            {tick}
          </Text>
        </group>
      ))}
      <Text position={[xScale(xMin), yScale(yMax) + 5, zScale(zMin)]} fontSize={3} color="black">Y</Text>


      {/* --- Z軸 --- */}
      <line>
        <bufferGeometry>
          <bufferAttribute
             attach="attributes-position"
             count={2}
             array={new Float32Array([
               xScale(xMin), yScale(yMin), zScale(zMin),
               xScale(xMin), yScale(yMin), zScale(zMax)
             ])}
             itemSize={3}
           />
        </bufferGeometry>
        <lineBasicMaterial color={axisColor} />
      </line>
      {zTicks.map((tick, i) => (
        <group key={`z-${i}`} position={[xScale(xMin), yScale(yMin), zScale(tick)]}>
          {/* Grid Line */}
           <line position={[0, (yScale(yMax) - yScale(yMin)) / 2, 0]}>
             <bufferGeometry>
               <bufferAttribute
                 attach="attributes-position"
                 count={2}
                 array={new Float32Array([
                   0, -(yScale(yMax) - yScale(yMin)) / 2, 0,
                   0, (yScale(yMax) - yScale(yMin)) / 2, 0
                 ])}
                 itemSize={3}
               />
            </bufferGeometry>
            <lineBasicMaterial color={gridColor} transparent opacity={0.5} />
          </line>
          {/* Label */}
          <Text
            position={[-3, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]} 
            fontSize={2}
            color="black"
            anchorX="right"
            anchorY="middle"
          >
            {tick}
          </Text>
        </group>
      ))}
      <Text position={[xScale(xMin), yScale(yMin), zScale(zMax) + 5]} fontSize={3} color="black">Z</Text>
      
    </group>
  );
};

// --- ScatterPoints コンポーネント ---
const ScatterPoints = ({ data, scales }) => {
  const { xScale, yScale, zScale } = scales;
  
  return (
    <group>
      <Instances>
        <sphereGeometry args={[POINT_SIZE, 16, 16]} />
        <meshStandardMaterial roughness={0.5} />
        
        {data.map((point, i) => (
          <Instance
            key={point.id}
            position={[xScale(point.x), yScale(point.y), zScale(point.z)]}
            color={COLOR_RANGE[i % COLOR_RANGE.length]}
            onClick={(e) => {
                e.stopPropagation();
                console.log("Clicked:", point);
            }}
          />
        ))}
      </Instances>
    </group>
  );
};

// --- メインのChartコンポーネント ---
const Chart3D = () => {
  const data = useMemo(() => generateData(100), []);

  const scales = useMemo(() => {
    // d3-arrayのextentを使用して範囲を取得
    // 今回のダミーデータは0-100固定ですが、実データに対応できるようextentを使用
    const xExt = extent(data, d => d.x) || [0, 100];
    const yExt = extent(data, d => d.y) || [0, 100];
    const zExt = extent(data, d => d.z) || [0, 100];

    const range = [-20, 20]; 

    // d3-scaleのscaleLinearを使用
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
    <div className="w-full h-screen bg-gray-50">
      <div className="absolute top-4 left-4 z-10 p-4 bg-white/80 rounded shadow pointer-events-none">
        <h1 className="text-xl font-bold mb-2">R3F 3D Scatter Plot (D3 Version)</h1>
        <p className="text-sm text-gray-600">
          Left Click: Rotate<br/>
          Right Click: Pan<br/>
          Scroll: Zoom
        </p>
      </div>

      <Canvas camera={{ position: [40, 40, 60], fov: 45 }} shadows>
        <color attach="background" args={['#f0f0f0']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[50, 50, 50]} intensity={1} castShadow />
        
        <OrbitControls makeDefault />

        <group position={[0, -10, 0]}>
            <Axis scales={scales} domain={scales.domain} />
            <ScatterPoints data={data} scales={scales} />
        </group>
      </Canvas>
    </div>
  );
};

export default Chart3D;