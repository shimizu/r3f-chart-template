import React from 'react';
import { Text } from '@react-three/drei';

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
            position={[0, -0.5, 0]}
            fontSize={0.5}
            color="black"
            anchorX="center"
            anchorY="top"
          >
            {tick}
          </Text>
        </group>
      ))}
      <Text position={[xScale(xMax) + 2, yScale(yMin), zScale(zMin)]} fontSize={1} color="black">X</Text>


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
            position={[-0.8, 0, 0]}
            fontSize={0.5}
            color="black"
            anchorX="right"
            anchorY="middle"
          >
            {tick}
          </Text>
        </group>
      ))}
      <Text position={[xScale(xMin), yScale(yMax) + 2, zScale(zMin)]} fontSize={1} color="black">Y</Text>


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
            position={[-0.8, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]} 
            fontSize={0.5}
            color="black"
            anchorX="right"
            anchorY="middle"
          >
            {tick}
          </Text>
        </group>
      ))}
      <Text position={[xScale(xMin), yScale(yMin), zScale(zMax) + 2]} fontSize={1} color="black">Z</Text>
      
    </group>
  );
};

export default Axis;
