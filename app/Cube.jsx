"use client";

export default function Cube() {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="tomato" />
    </mesh>
  );
}
