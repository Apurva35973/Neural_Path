import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function GradientDescent3D({ step, active }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 50, 50);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = Math.sin(x/2) * Math.cos(y/2) * 2 + (x*x + y*y) / 10;
        pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const path = useMemo(() => {
    const p = [];
    let curX = 4, curY = 4;
    for(let i=0; i<100; i++) {
        p.push([curX, curY, Math.sin(curX/2) * Math.cos(curY/2) * 2 + (curX*curX + curY*curY) / 10 + 0.5]);
        curX *= 0.95; curY *= 0.95;
    }
    return p;
  }, []);

  return (
    <group rotation={[-Math.PI / 3, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#4338ca" wireframe opacity={0.4} transparent />
      </mesh>
      <Sphere position={path[step % 100]} args={[0.25]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
      </Sphere>
      <Text position={[0, 0, 6]} fontSize={0.5} rotation={[Math.PI / 3, 0, 0]} color="white">Loss Surface Minimization</Text>
    </group>
  );
}
