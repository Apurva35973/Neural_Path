import { useMemo } from 'react';
import { Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function KNN3D({ step }) {
  const points = useMemo(() => Array.from({ length: 80 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 5;
    const isClassA = radius < 2.5;
    return {
      pos: [Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 2],
      color: isClassA ? "#4f46e5" : "#ec4899",
      isClassA
    };
  }), []);

  const target = [0, 0, 0];
  const neighbors = useMemo(() => {
    return [...points]
      .sort((a, b) => {
        const da = Math.hypot(a.pos[0] - target[0], a.pos[1] - target[1], a.pos[2] - target[2]);
        const db = Math.hypot(b.pos[0] - target[0], b.pos[1] - target[1], b.pos[2] - target[2]);
        return da - db;
      })
      .slice(0, Math.min(step % 10 + 1, 10));
  }, [step, points]);

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={p.pos} args={[0.1]}>
          <meshStandardMaterial color={p.color} opacity={0.4} transparent />
        </Sphere>
      ))}
      <Sphere position={target} args={[0.2]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
      </Sphere>
      {neighbors.map((n, i) => (
        <group key={i}>
          <Sphere position={n.pos} args={[0.15]}>
            <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={2} />
          </Sphere>
          <Line points={[target, n.pos]} color="white" lineWidth={1} transparent opacity={0.5} />
        </group>
      ))}
      <Text position={[0, 6, 0]} fontSize={0.4} color="white">K-Nearest Neighbors (K={neighbors.length})</Text>
    </group>
  );
}
