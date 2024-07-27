/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 banana.glb --transform 
Files: banana.glb [966.32KB] > C:\Users\punct\Desktop\next-r3f-template\public\banana-transformed.glb [36.1KB] (96%)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/banana-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.banana.geometry} material={materials.skin} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/banana-transformed.glb')