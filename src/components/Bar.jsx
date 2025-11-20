import React, { useRef, useEffect } from 'react';
import { Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const Bar = ({ data, scales, color_range }) => {
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
            color={color_range[point.id % color_range.length]}
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
