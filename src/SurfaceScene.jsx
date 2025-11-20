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
      
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} intensity={1} />
      
      <OrbitControls makeDefault />

      <group>
        <Axis scales={scales} domain={scales.domain} />
        <Surface data={data} scales={scales} colorScale={colorScale} />
      </group>
    </>
  );
}

export default SurfaceScene;
