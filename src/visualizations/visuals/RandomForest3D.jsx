import { useMemo } from 'react';
import { Float, Box, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function RandomForest3D({ step }) {
  const trees = useMemo(() => [
    { offset: [-4, 0, -2], color: "#22c55e" },
    { offset: [0, 0, 0], color: "#10b981" },
    { offset: [4, 0, -2], color: "#059669" },
    { offset: [-2, 0, 3], color: "#34d399" },
    { offset: [2, 0, 3], color: "#6ee7b7" },
  ], []);

  return (
    <group>
      {trees.map((tree, tIdx) => (
        <group key={tIdx} position={tree.offset} scale={0.6}>
          {/* Miniature Tree Structure */}
          <Box position={[0, 2, 0]} args={[1, 0.5, 0.2]}>
            <meshStandardMaterial color={tree.color} />
          </Box>
          <Line points={[[0, 2, 0], [-1, 1, 0]]} color={tree.color} />
          <Line points={[[0, 2, 0], [1, 1, 0]]} color={tree.color} />
          <Box position={[-1, 1, 0]} args={[0.6, 0.3, 0.1]}><meshStandardMaterial color={tree.color} /></Box>
          <Box position={[1, 1, 0]} args={[0.6, 0.3, 0.1]}><meshStandardMaterial color={tree.color} /></Box>
          <Float speed={5} floatIntensity={0.5}>
             {step % 5 === tIdx && <Sphere position={[0, 3, 0]} args={[0.2]}><meshStandardMaterial color="yellow" emissive="yellow" /></Sphere>}
          </Float>
        </group>
      ))}
      <Text position={[0, 5, 0]} fontSize={0.4} color="white">Random Forest Voting</Text>
    </group>
  );
}

import { Sphere } from '@react-three/drei';
