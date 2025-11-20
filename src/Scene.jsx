import { useEffect } from "react"
import { OrbitControls, RandomizedLight } from "@react-three/drei"
import * as THREE from "three"
import { useControls } from "leva"
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import chroma from 'chroma-js';




const vertexShader = `
  varying vec3 vPosition;
  
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;

  void main() {
    gl_FragColor = vec4(abs(vPosition), 1.0); // シンプルな色の変化
  }
`;


function Scene(){

    useFrame((state, delta)=>{
        const boxPivot = state.scene.getObjectByName("boxPivot");
        boxPivot.rotation.y += delta
    })

    return (
        <>

            <OrbitControls />

            <RandomizedLight />

            <EffectComposer>
                <Bloom
                    intensity={1}
                    mipmapBlur={false}
                    luminanceThreshold={0.9}
                    luminanceSmoothing={0.025}
                />
            </EffectComposer>


            <group name="boxPivot">
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <shaderMaterial
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={{}}
                    />
                </mesh>

            </group>
                        
        </>
    )
}

export default Scene