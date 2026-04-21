import { useMemo } from 'react';
import { Sphere, Box, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function SVM3D({ step }) {
  const points = useMemo(() => Array.from({ length: 60 }, () => {
    const x = Math.random() * 8 - 4;
    const y = Math.random() * 8 - 4;
    const isClassA = y > x + 0.5;
    const isClassB = y < x - 0.5;
    if (!isClassA && !isClassB) return null;
    return { pos: [x, y, 0], color: isClassA ? "#4f46e5" : "#ec4899", isSupport: Math.abs(y - x) < 0.8 };
  }).filter(Boolean), []);

  const planeRotation = (step % 10) * 0.05;

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={p.pos} args={[p.isSupport ? 0.2 : 0.1]}>
          <meshStandardMaterial 
            color={p.color} 
            emissive={p.color} 
            emissiveIntensity={p.isSupport ? 1.5 : 0} 
          />
        </Sphere>
      ))}
      {/* Decision Hyperplane */}
      <Box position={[0, 0, 0]} args={[12, 0.05, 5]} rotation={[0, 0, Math.PI / 4 + planeRotation]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </Box>
      <Text position={[0, 5, 0]} fontSize={0.4} color="white">Support Vector Machine</Text>
    </group>
  );
}
