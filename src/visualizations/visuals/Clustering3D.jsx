import { useMemo } from 'react';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function Clustering3D({ step }) {
  const points = useMemo(() => Array.from({ length: 120 }, () => {
    const cluster = Math.floor(Math.random() * 3);
    const center = [[-3, -2, 0], [3, -2, 0], [0, 4, 0]][cluster];
    return {
      pos: [center[0] + (Math.random() - 0.5) * 4, center[1] + (Math.random() - 0.5) * 4, center[2] + (Math.random() - 0.5) * 4],
      cluster
    };
  }), []);

  const centroids = useMemo(() => [
    { pos: [-3, -2, 0], color: "#ef4444" },
    { pos: [3, -2, 0], color: "#3b82f6" },
    { pos: [0, 4, 0], color: "#22c55e" },
  ], []);

  const colors = ["#ef4444", "#3b82f6", "#22c55e"];

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={p.pos} args={[0.12]}>
          <meshStandardMaterial color={colors[p.cluster]} />
        </Sphere>
      ))}
      {centroids.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={2} />
        </mesh>
      ))}
      <Text position={[0, 7, 0]} fontSize={0.5} color="white">K-Means Clustering</Text>
    </group>
  );
}
