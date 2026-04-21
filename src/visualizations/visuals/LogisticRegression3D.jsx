import { useMemo } from 'react';
import { Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function LogisticRegression3D({ step, active }) {
  const points = useMemo(() => Array.from({ length: 60 }, () => {
    const x = Math.random() * 10 - 5;
    const label = x > 0 ? 1 : 0;
    const y = label + (Math.random() - 0.5) * 0.5;
    return { pos: [x, y * 4 - 2, 0], color: label ? '#22c55e' : '#ef4444' };
  }), []);

  const curvePoints = useMemo(() => {
    const p = [];
    for (let x = -6; x <= 6; x += 0.2) {
      const y = 1 / (1 + Math.exp(-x * (1 + step * 0.1)));
      p.push([x, y * 4 - 2, 0]);
    }
    return p;
  }, [step]);

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={p.pos} args={[0.12]}>
          <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.5} />
        </Sphere>
      ))}
      <Line points={curvePoints} color="#6366f1" lineWidth={5} />
      <Text position={[0, 3, 0]} fontSize={0.4} color="white">Sigmoid Activation</Text>
    </group>
  );
}
