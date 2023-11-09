import * as THREE from 'three';
import React, { useRef, useMemo, } from 'react';
import { useFrame,useThree } from '@react-three/fiber';
import {mapRange, lerp } from 'canvas-sketch-util/math';

export function Stars({ count }) {
  const mesh = useRef();
  const mat = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate particles with initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      const emission = 2
      temp.push({ xFactor, yFactor, zFactor, emission });
    }
    return temp;
  }, [count]);

  if(mesh.current){
    // Update the instanced mesh once
    particles.forEach((particle, i) => {
      const { xFactor, yFactor, zFactor, emission } = particle;
      dummy.position.set(
        xFactor,
        yFactor,
        zFactor
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
  }
  useFrame((state) => {
    if (mesh.current){
      const time = state.clock.getElapsedTime(); // Use time to create a cyclic pattern



      for (let i = 0; i < particles.length; i++) {
        //console.log(particles[i]);
        const particle = particles[i];
        const lerpFactor = 0.5 + 0.5 * Math.sin(( 2 * 0.1*((time+i)*25))); // Adjust frequency and pattern
        //console.log(lerpFactor);
        //Calculate the new emission intensity
        const minIntensity = 1;
        const maxIntensity = 2;
        const newEmissiveIntensity = lerp(
          minIntensity,
          maxIntensity,
          lerpFactor
        );


      
      }
      //mesh.current.instanceMatrix.needsUpdate = true;
    }

  });



  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshPhysicalMaterial ref={mat}
        color={"gold"}
        roughness={0.5}
        metalness={0.2}
        emissive={"white"}
        emissiveIntensity={10}
      />
    </instancedMesh>
  );
}
