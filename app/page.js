"use client";

import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  return (
    <Canvas shadows>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls />
      <ambientLight intensity={3} />
      <directionalLight position={[2, 1, 0]} intensity={5} />

      <Cube />
    </Canvas>
  );
}
