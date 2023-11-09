import shallow from 'zustand/shallow';
import { OrbitControls, CameraShake, Environment } from '@react-three/drei';
// import HDRFile from 'public/Back_1k.hdr'
import { BlackHole } from './BlackHole';
import { SparkStormCustom } from './SparkStormCustom';
import { SpaceDust } from './SpaceDust';
import { PortalBody } from './PortalBody';
import { Stars } from './Stars';
import { Sparks } from './Sparks';
import { RocketShip } from './RocketShip';
import { Cloud} from "@react-three/drei";

import { useEffect  } from 'react';

const colors = {

  malevolentIllusion: [
    '#9ac069',
    '#a8de77',
    '#b4df86',
    '#c0d998',
    '#c6eead',
    '#c9f9c6',
],
  sunnyRainbow: [
    '#431C0D',
    '#6E3907',
    '#A85604',
    '#FFB600',
    '#FFD200',
    '#FFE74C',
    '#FFED7D'
  ],
  blackRainbow: [
    '#05070A',
    '#1E2A3A',
    '#3D4D5C',
    '#6E879C',
    '#AAB9C9',
    '#CED8E4',
    '#E4EBF1'
  ],
};

// const appStateSelector = (state) => ({
//   sparkStorm: state.sparkStorm,
//   planetDistortion: state.planetDistortion,
//   spaceshipDistortion: state.spaceshipDistortion,
//   beep: state.beep,
//   planetDistortionMax: state.planetDistortionMax,
//   distortFactor: state.distortFactor
//
// });
//
export function Scene({ init = true, mouse, cameraRef }) {
//   const {
//     sparkStorm,
//     planetDistortion,
//     spaceshipDistortion,
//     beep,
//     planetDistortionMax,
//     distortFactor,
//     scale,
//   } = useMusicStore(appStateSelector, shallow);
//
// const camera = useCamera();


  // useEffect(() => {
  //   console.log('Camera reference updated:', camera);
  // }, [camera]);
  //
  // // Use the camera reference as needed
  // console.log('Current camera reference:', camera);
// <CameraShake
//   yawFrequency={0.05 * (sparkStorm ? 10 : 1)}
//   rollFrequency={0.2 * (sparkStorm ? 2 : 1)}
//   pitchFrequency={0.1 * (sparkStorm ? 2 : 1)}
// />
//  <SparkStormCustom  count={250} mouse={mouse} colors={colors.sunnyRainbow} />
          // <Environment files="./Back_1k.hdr" background blur={0.5} />
  //console.log(distortFactor);
  //console.log(sparkStorm);

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
      />



      <ambientLight distance={100} intensity={2} color="#e7f7b0" />
      <group >

        <SpaceDust count={250} mouse={mouse} />
        <SparkStormCustom  count={250} mouse={mouse} colors={colors.sunnyRainbow} radius = {3}/>
        <Stars count={1000}  />
        <BlackHole  />
        <PortalBody />
        <RocketShip radius = {32}/>
      
      </group>
    </>
  );
}
