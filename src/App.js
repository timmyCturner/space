import * as THREE from 'three';
import React, { Suspense, useState, useCallback, useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as meshline from './MeshLine';
import { Effects } from './Effects';
import { Scene } from './Scene';
import { Environment } from '@react-three/drei';
import { Cloud} from "./Cloud"
// import './styles.css';


extend(meshline);

function generateCloudRing(center, radius, cloudCount, ...cloudProps) {
  const cloudRing = [];
  for (let i = 0; i < cloudCount; i++) {
    const angle = (i / cloudCount) * Math.PI * 2;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1];
    const z = center[2] + radius * Math.sin(angle);
    //console.log(cloudProps[0].speed);
    cloudRing.push(
      <Cloud key={i} position={[x, y, z]} speed = {cloudProps[0].speed} color = {cloudProps[0].color} opacity = {cloudProps[0].opacity}
      segments = {cloudProps[0].segments} depth = {cloudProps[0].depth} depthTest = {cloudProps[0].depthTest} scaleRatio={true} {...cloudProps}/>
    );
  }
  return cloudRing;
}


function generateSpiralClouds(center, radius, spiralCount, ...cloudProps) {
  const cloudSpiral = [];
  for (let h = 0; h < 3; h++) {
    for (let i = 0; i < spiralCount-2; i++) {
      const angle =((i*i) / (spiralCount*spiralCount) * Math.PI)+((2*h)*Math.PI/4);
      const spiralRadius = radius * (angle / (Math.PI ));

      const currRadius = (radius*((spiralCount-i)/spiralCount))
      //console.log(currRadius);

      const x = center[0] + currRadius  * Math.cos(1.25*angle);
      const y = center[1];
      const z = center[2] + currRadius * Math.sin(1.25*angle);
      const width = (currRadius/5);
      //console.log(currRadius,width,cloudProps[0],[x, y, z]);
      const key = h.toString()+i.toString();
      cloudSpiral.push(
        <Cloud key={key} position={[x, y, z]} speed = {cloudProps[0].speed} opacity = {cloudProps[0].opacity} depth = {cloudProps[0].depth} depthTest = {cloudProps[0].depthTest}
        segments = {5} width = {width} {...cloudProps} />
      );
    }
  }
  return cloudSpiral;
}


export default function App() {

  const cameraRef = useRef();
  // const setCameraRef = useCallback((camera) => {
  //   cameraRef.current = camera;
  // }, []);
  //const setCameraRef = useSetCamera();
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (

    <div onMouseMove={onMouseMove} style={{ width: '100vw', height: '100vh' }}>

      <Canvas
        pixelratio={window.devicePixelRatio}
        camera={{ fov: 100, position: [30, 0, 0] }}
        onCreated={({ gl, size, camera }) => {
          //const setCameraRef = useSetCamera();
          //setCameraRef(camera); // Store the camera reference
          //setCamera(camera);
          cameraRef.current = camera; // Store the camera reference
          //console.log(camera,cameraRef);
          if (size.width < 600) {
            camera.position.z = 45;
          }
          gl.setClearColor(new THREE.Color('#080808'));

        }}>

        <Suspense fallback={null}>

                {generateSpiralClouds([0, 0, 0], 50, 15, { speed: 0.2, opacity: 0.75, segments: 25, size:5,  depthTest: false, depth: 1})}
                {generateCloudRing([0, 0, 0], 50, 50, { speed: 0.2, opacity: 0.25, segments: 25, size:5, depthTest: false, depth: 1, color: "#643b81" })}

        </Suspense>
        {/*  <Environment files="./pinkMountain.hdr" background blur={0}/>
        <group  rotation = {[0,Math.PI/2,0]}>
           <Scene init={init} mouse={mouse} />
        </group>
        {generateCloudRing([0, 0, 0], 50, 50, { speed: 0.2, opacity: 0.25, segments: 25, size:5, depthTest: true, color: "#643b81" })}*/}
        <group  rotation = {[0,Math.PI/2,0]}>

              <Scene mouse={mouse} cameraRef={cameraRef} />

        </group>
        <Effects />


      </Canvas>





    </div>
  );
}
