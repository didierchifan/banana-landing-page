"use client";

import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Banana({ z }) {
  const cube = useRef();

  const { nodes, materials } = useGLTF("/banana-transformed.glb");

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // -3 to 3
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state, delta) => {
    cube.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );

    cube.current.position.set(data.x * width, (data.y += 0.025), z);
    if (data.y > height) {
      data.y = -height;
    }
  });

  return (
    <mesh
      ref={cube}
      geometry={nodes.banana.geometry}
      material={materials.skin}
      material-emissive="tomato"
      material-emissiveIntensity={0.5}
    />
  );
}

export default function Experience({ count = 200, depth = 80 }) {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  return (
    <Canvas
      flat
      gl={{ alpha: false }}
      camera={{ near: 0.01, far: 110, fov: 30 }}
    >
      {perfVisible && <Perf position="top-left" />}

      <color attach="background" args={["#ffbf40"]} />

      {Array.from({ length: count }, (_, i) => (
        <Banana key={i} z={-(i / count) * depth - 10} />
      ))}

      <ambientLight intensity={2} />
      <spotLight position={[10, 10, 10]} intensity={3} />
      <Suspense fallback={null}>
        <Banana scale={0.5} />
        <Environment preset="sunset" />
        {/* <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer> */}
      </Suspense>
    </Canvas>
  );
}
