import React from 'react';
import { Instance, Instances } from '@react-three/drei';

const Bar = ({ data, scales, colorScale }) => {
  const { xScale, yScale, zScale } = scales;

  return (
    <Instances>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial roughness={0.5} />

      {data.map((point) => {
        const ySize = yScale(point.y) - yScale(0);
        return (
          <Instance
            key={point.id}
            color={colorScale(point.y)}
            position={[
              xScale(point.x),
              yScale(0) + ySize / 2,
              zScale(point.z)
            ]}
            scale={[1, ySize, 1]}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Clicked:", point);
            }}
          />
        );
      })}
    </Instances>
  );
};

export default Bar;
