import React, { useMemo } from 'react';
import * as THREE from 'three';

const Surface = ({ data, scales, colorScale }) => {
  const { yScale } = scales;
  const { width, height, widthSegments, heightSegments } = data;

  const geometry = useMemo(() => {
    if (!colorScale) return new THREE.PlaneGeometry();

    const geom = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    geom.rotateX(-Math.PI / 2); // XZ平面に合わせる

    const positions = geom.attributes.position.array;
    const colors = [];

    for (let i = 0; i <= widthSegments; i++) {
      for (let j = 0; j <= heightSegments; j++) {
        const index = (i * (heightSegments + 1) + j);
        const dataIndex = j * (widthSegments + 1) + i;
        
        // Y座標をデータに応じて更新
        const yValue = data.values[dataIndex] || 0;
        positions[index * 3 + 1] = yScale(yValue);

        // 頂点カラーを設定
        const color = new THREE.Color(colorScale(yValue).hex());
        colors.push(color.r, color.g, color.b);
      }
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals(); // 法線を再計算してライティングを正しくする
    
    return geom;
  }, [data, scales, colorScale]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        vertexColors={true}
        side={THREE.DoubleSide}
        roughness={0.5}
      />
    </mesh>
  );
};

export default Surface;
