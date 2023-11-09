import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import Random from 'canvas-sketch-util/random';
import { lerp, mapRange } from 'canvas-sketch-util/math';


//http://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

export function BlackHole() {
  const planet = useRef();

  //console.log(planet);
  
  return (
    <mesh ref={planet} position={[0,0,0]} scale = {1}>
      <sphereGeometry args={[5, 36]} />
      <meshPhysicalMaterial
        color={"#000"}
        roughness={0.5}
        metalness={0.2}
        emissive={"#000"}
        emissiveIntensity={0}
      />
    </mesh>
  );
}
