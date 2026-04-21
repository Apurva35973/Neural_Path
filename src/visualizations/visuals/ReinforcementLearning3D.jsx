import { useMemo } from 'react';
import { Box, Sphere, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function ReinforcementLearning3D({ step }) {
  const gridSize = 5;
  const grid = useMemo(() => {
    const g = [];
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        g.push({ pos: [x * 2, -1, z * 2], reward: (x === 2 && z === 2) ? 10 : (x === 0 && z === 1) ? -10 : 0 });
      }
    }
    return g;
  }, []);

  const agentPos = useMemo(() => {
    const path = [[-4, -1, -4], [-2, -1, -4], [0, -1, -4], [0, -1, -2], [0, -1, 0], [2, -1, 0], [4, -1, 0], [4, -1, 2], [4, -1, 4]];
    return path[step % path.length];
  }, [step]);

  return (
    <group>
      {grid.map((cell, i) => (
        <group key={i} position={cell.pos}>
          <Box args={[1.8, 0.2, 1.8]}>
            <meshStandardMaterial color={cell.reward > 0 ? "#22c55e" : cell.reward < 0 ? "#ef4444" : "#334155"} />
          </Box>
          {cell.reward !== 0 && (
            <Text position={[0, 1, 0]} fontSize={0.3} color="white">{cell.reward > 0 ? "+10" : "-10"}</Text>
          )}
        </group>
      ))}
      <Sphere position={[agentPos[0], 0, agentPos[2]]} args={[0.5]}>
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" />
      </Sphere>
      <Text position={[0, 6, 0]} fontSize={0.5} color="white">Reinforcement Learning Agent</Text>
    </group>
  );
}
