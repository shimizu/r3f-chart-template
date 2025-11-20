import React from 'react';
import { OrbitControls } from '@react-three/drei';
import Axis from './components/Axis';
import Surface from './components/Surface';

function SurfaceScene({ data, scales, colorScale }) {
  if (!data || !scales) {
    return null;
  }

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        position={[50, 50, 50]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={150}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <directionalLight position={[-50, -30, -50]} intensity={0.5} />
      
      <OrbitControls makeDefault />

      <group>
        <Axis scales={scales} domain={scales.domain} />
        <Surface data={data} scales={scales} colorScale={colorScale} />
      </group>
    </>
  );
}

export default SurfaceScene;
