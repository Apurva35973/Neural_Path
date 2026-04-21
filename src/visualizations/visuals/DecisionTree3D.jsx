import { useMemo } from 'react';
import { Float, Box, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function DecisionTree3D({ step }) {
  const nodes = useMemo(() => [
    { pos: [0, 4, 0], label: "Age > 30?", color: "#6366f1" },
    { pos: [-3, 2, 0], label: "Income > 50k", color: "#818cf8" },
    { pos: [3, 2, 0], label: "Student?", color: "#818cf8" },
    { pos: [-4.5, 0, 0], label: "Buy ✓", color: "#22c55e" },
    { pos: [-1.5, 0, 0], label: "Don't ✗", color: "#ef4444" },
    { pos: [1.5, 0, 0], label: "Buy ✓", color: "#22c55e" },
    { pos: [4.5, 0, 0], label: "Don't ✗", color: "#ef4444" },
  ], []);

  return (
    <group>
      {nodes.map((n, i) => {
        const visible = i <= step;
        if (!visible) return null;
        return (
          <group key={i}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Box position={n.pos} args={[2.2, 1, 0.5]}>
                <meshStandardMaterial color={n.color} metalness={0.6} roughness={0.2} />
                <Text position={[0, 0, 0.26]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                  {n.label}
                </Text>
              </Box>
            </Float>
            {i > 0 && (
              <Line 
                points={[n.pos, nodes[Math.floor((i-1)/2)].pos]} 
                color="#4f46e5" 
                lineWidth={2} 
                transparent 
                opacity={0.6} 
              />
            )}
          </group>
        );
      })}
    </group>
  );
}
