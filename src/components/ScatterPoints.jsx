import React from 'react';
import { Instance, Instances } from '@react-three/drei';

// --- ScatterPoints コンポーネント ---
const ScatterPoints = ({ data, scales, point_size, colorScale }) => {
  const { xScale, yScale, zScale } = scales;
  
  return (
    <group>
      <Instances>
        <sphereGeometry args={[point_size, 16, 16]} />
        <meshStandardMaterial roughness={0.5} />
        
        {data.map((point) => (
          <Instance
            key={point.id}
            position={[xScale(point.x), yScale(point.y), zScale(point.z)]}
            color={colorScale(point.y)}
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

export default ScatterPoints;
