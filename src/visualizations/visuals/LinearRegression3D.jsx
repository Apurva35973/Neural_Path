import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function LinearRegression3D({ step, active }) {
  const points = useMemo(() => Array.from({ length: 50 }, () => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    z: Math.random() * 2 - 1
  })), []);

  const lineRef = useRef();
  
  useFrame((state) => {
    if (active && lineRef.current) {
      const t = state.clock.getElapsedTime();
      lineRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  const slope = useMemo(() => (step % 10) / 5 - 1, [step]);

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={[p.x, p.y, p.z]} args={[0.1]}>
          <meshStandardMaterial color="#818cf8" />
        </Sphere>
      ))}
      <Line 
        ref={lineRef}
        points={[[-6, -6 * slope, 0], [6, 6 * slope, 0]]}
        color="#fbbf24"
        lineWidth={4}
      />
      <Text position={[0, 6, 0]} fontSize={0.5} color="white">y = mx + b</Text>
    </group>
  );
}
