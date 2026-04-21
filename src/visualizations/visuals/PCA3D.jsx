import { useMemo } from 'react';
import { Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function PCA3D({ step }) {
  const points = useMemo(() => Array.from({ length: 100 }, () => {
    const x = Math.random() * 10 - 5;
    const y = x * 0.5 + (Math.random() - 0.5) * 2;
    const z = x * 0.2 + (Math.random() - 0.5) * 2;
    return [x, y, z];
  }), []);

  const angle = (step % 20) * 0.1;

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={p} args={[0.08]}>
          <meshStandardMaterial color="#818cf8" transparent opacity={0.6} />
        </Sphere>
      ))}
      {/* Principal Component Axes */}
      <Line points={[[-6, -3, -1.2], [6, 3, 1.2]]} color="#fbbf24" lineWidth={3} />
      <Line points={[[-2, 4, 0], [2, -4, 0]]} color="#ec4899" lineWidth={2} />
      <Text position={[0, 6, 0]} fontSize={0.4} color="white">Principal Component Analysis</Text>
    </group>
  );
}
