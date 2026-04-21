import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralNetwork3D({ step, active }) {
  const layers = [4, 6, 2];
  const nodes = useMemo(() => {
    const n = [];
    layers.forEach((count, lIdx) => {
      for (let i = 0; i < count; i++) {
        n.push({ x: lIdx * 4 - 4, y: i * 1.5 - (count - 1) * 0.75, layer: lIdx, id: `${lIdx}-${i}` });
      }
    });
    return n;
  }, []);

  const connections = useMemo(() => {
    const c = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].layer === nodes[i].layer + 1) {
          c.push({ from: [nodes[i].x, nodes[i].y, 0], to: [nodes[j].x, nodes[j].y, 0] });
        }
      }
    }
    return c;
  }, [nodes]);

  const signalRef = useRef();

  return (
    <group>
      {connections.map((c, i) => (
        <Line key={i} points={[c.from, c.to]} color="#4f46e5" lineWidth={1} transparent opacity={0.2} />
      ))}
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color={node.layer === step % 3 ? "#818cf8" : "#312e81"} 
            emissive={node.layer === step % 3 ? "#818cf8" : "#000"}
            emissiveIntensity={active ? 2 : 0}
          />
        </mesh>
      ))}
      {active && (
        <Float speed={10} floatIntensity={0.1}>
           <Sphere position={[ (step % 3 - 1) * 4, 0, 0.5]} args={[0.2]}>
              <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={2} />
           </Sphere>
        </Float>
      )}
      <Text position={[0, 6, 0]} fontSize={0.4} color="white">Deep Neural Network</Text>
    </group>
  );
}

import { Float } from '@react-three/drei';
