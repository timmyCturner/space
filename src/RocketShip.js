import * as THREE from 'three';
import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame,useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { lerp, mapRange } from 'canvas-sketch-util/math';


import {
  createAttractor,
  updateAttractor,
  lorenzMod2Attractor,
  circleAttractor,
  lorenzAttractor,
    rosslerAttractor,
  halversonAttractor
} from './attractor';

let nextPosition1;
let nextPosition2;
let nextPosition3;

export function RocketShip(props, width = 0.5, opacity = 0.25) {

  const newArray = [
    1.000, 0.983, 0.967, 0.950, 0.933, 0.917, 0.900, 0.883,
    0.867, 0.850, 0.833, 0.817, 0.800, 0.783, 0.767, 0.750,
    0.733, 0.717, 0.700, 0.683, 0.667, 0.650, 0.633, 0.617,
    0.600, 0.583, 0.567, 0.550, 0.533, 0.517, 0.500, 0.483,
    0.467, 0.450, 0.433, 0.417, 0.400, 0.383, 0.367, 0.350,
    0.333, 0.317, 0.300, 0.283, 0.267, 0.250, 0.233, 0.217,
    0.200, 0.183, 0.167, 0.150, 0.133, 0.117, 0.100, 0.083,
    0.067, 0.050, 0.033, 0.017, 0.000
];
  // const radius = 1;
  // const fixedPoint = [1, 0, 0];
  // const movingPoint = [0, 1, 0];
  //
  // const equidistantPoints = calculateEquidistantPoints(radius, fixedPoint, movingPoint);
  // console.log(equidistantPoints);

  let nextPosition;
  let targetPosition;
  const cameraRef = useRef();
  //let targetStep;
  // let isFired = false;
  // let inProgress= false;


  const group = useRef();
  const melody = useRef(0);
  const material = useRef();
  //const materialRed = useRef();

  const { nodes, materials } = useGLTF(
    '/model.glb'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf'
  );

  const line = useRef(0);
  //const laser = useRef(0);

  const [positions, currentPosition] = useMemo(
    () => createAttractor(30, [0, props.radius, 0]),
    []
  );
  useThree(({ camera }) => {
    //console.log(camera);
    cameraRef.current = camera

   //camera.rotation.set(THREE.MathUtils.degToRad(30), 0, 0);
 });


  useFrame((state) => {

    if (cameraRef.current && group.current) {
      // Calculate the desired camera position based on the group's position
      const desiredCameraPosition = new THREE.Vector3();
      const position = group.current.getWorldPosition(desiredCameraPosition);

      console.log(5*Math.cos(position.y)/ props.radius);
      //console.log(group.current.getWorldPosition(desiredCameraPosition));
      // Offset the camera's position to be above and behind the object
      const cameraOffset = new THREE.Vector3(0, 5, -10); // Adjust these values as needed
      desiredCameraPosition.add(cameraOffset);

      // Adjust camera position
      cameraRef.current.position.lerp(desiredCameraPosition, 0.1);

      // Look at the group
      cameraRef.current.lookAt(group.current.position);
    }


    if (group.current) {
      let target;

        target = updateAttractor(
          currentPosition,
          props.radius,
            circleAttractor,
          0.002
        );


      const newline = [];
      const numberOfElements = 60;

      // for (let i = 0; i < numberOfElements; i++) {
      //     const value = 1 - (i / (numberOfElements - 1));
      //     newline.push(value);
      // }
      // line.current.width = newline
      const animationDuration = 1000; // Animation duration in milliseconds
        const elapsedTime = state.clock.elapsedTime * 1000; // Convert to milliseconds
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const newLineWidth = 60 * (1 - progress); // From 60 to 0

        // Update the line's width

        //console.log(line.current);

      //line.current.setAttribute('lineWidth', new THREE.Float32BufferAttribute([60], 1));

      //console.log(line.current.width);
      //width = [5,1,1,1,1,1,1,1]
      if (nextPosition) {
        //console.log(props.sphereType);
        //console.log(nextPosition);
        group.current.position.copy(
          nextPosition.clone().add(new THREE.Vector3(0, 0, 0))
        );


        group.current.lookAt(target);
        //line.current.advance(nextPosition.clone().add(new THREE.Vector3(0, 0, Math.sin(group.current.position.z))));




      }

      nextPosition = target;
      //console.log(target);
    }

    //console.log(width,opacity);
  });

  //new THREE.MeshPhongMaterial({ ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30 })
  const material1 = new THREE.MeshPhongMaterial({  color: 0xc70000, emissive:0xc70000, transparent: 1, name: "Emit" }) //new THREE.MeshStandardMaterial({ color: 0xdddddd, opacity:0})
  const material2 =  new THREE.MeshPhongMaterial({  color: 0xa7c700, emissive:0xa7c700, transparent: 1, name: "Emit" })
  // console.log(material1);
  //console.log(nodes);
  // console.log(materials);

  return (
    <>
    <group {...props} ref={group}  dispose={null}>
      <mesh geometry={nodes.Cube005.geometry} material={materials.Mat0} />
      <mesh geometry={nodes.Cube005_1.geometry} material={materials.Mat1} />
      <mesh geometry={nodes.Cube005_2.geometry} material={materials.Mat2} />
      <mesh geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
      <mesh geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
      <mesh geometry={nodes.Cube005_5.geometry} material={materials.Mat3} />
      <mesh geometry={nodes.Cube005_6.geometry} material={materials.Window} />
    </group>


    </>
  );
}

useGLTF.preload(
  '/model.glb'
  // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf'
);


// <mesh>
//   <meshLine  ref={laser} attach="geometry"  points={targetPositions}/>
//   <meshLineMaterial
//     attach="material"
//     lineWidth={0.25}
//     color="#FF0000"
//     transparent
//     opacity={opacity}
//   />
// </mesh>
