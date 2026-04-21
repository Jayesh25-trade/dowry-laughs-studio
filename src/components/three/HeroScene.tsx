import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, OrbitControls, Text3D, Center } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function GoldCoin({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.6;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <cylinderGeometry args={[0.7, 0.7, 0.12, 64]} />
        <meshStandardMaterial color="#c9a84c" metalness={1} roughness={0.15} emissive="#7a5a1a" emissiveIntensity={0.25} />
      </mesh>
    </Float>
  );
}

function CrackedRupee() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <Center>
        <Suspense fallback={null}>
          <Text3D
            ref={ref}
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={2.4}
            height={0.5}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.08}
          >
            ₹
            <MeshDistortMaterial color="#c9a84c" metalness={0.95} roughness={0.2} distort={0.18} speed={1.2} />
          </Text3D>
        </Suspense>
      </Center>
    </Float>
  );
}

export const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={["#0d0d0d"]} />
      <fog attach="fog" args={["#0d0d0d", 8, 22]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f0d78c" />
      <directionalLight position={[-5, -3, -2]} intensity={0.5} color="#c9a84c" />
      <pointLight position={[0, 0, 4]} intensity={1} color="#f0d78c" />
      <Suspense fallback={null}>
        <CrackedRupee />
        <GoldCoin position={[-3.2, 1.6, -1]} scale={0.6} />
        <GoldCoin position={[3.4, -1.4, -0.5]} scale={0.8} />
        <GoldCoin position={[-2.8, -1.8, 1]} scale={0.5} />
        <GoldCoin position={[3, 1.8, 1.2]} scale={0.45} />
        <GoldCoin position={[0, 2.6, -2]} scale={0.4} />
        <Environment preset="sunset" />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
};

export const FloatingCoins = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[3, 3, 3]} intensity={1} color="#f0d78c" />
    <Suspense fallback={null}>
      <GoldCoin position={[-1.8, 0.8, 0]} scale={0.5} />
      <GoldCoin position={[1.6, -0.6, 0.5]} scale={0.6} />
      <GoldCoin position={[0, 1.2, -1]} scale={0.4} />
      <Environment preset="sunset" />
    </Suspense>
  </Canvas>
);
