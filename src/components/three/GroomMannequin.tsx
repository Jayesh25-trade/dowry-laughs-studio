import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const GOLD = "#c9a84c";
const GOLD_DARK = "#7a5a1a";
const GOLD_LIGHT = "#f0d78c";

function GoldMaterial({ emissive = 0.2 }: { emissive?: number }) {
  return (
    <meshStandardMaterial
      color={GOLD}
      metalness={1}
      roughness={0.18}
      emissive={GOLD_DARK}
      emissiveIntensity={emissive}
    />
  );
}

function Mannequin({ variant = 0 }: { variant?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    // Gentle idle sway when user not dragging — OrbitControls overrides on drag
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  // Variant tweaks: hat, briefcase, tie color
  const hat = variant % 2 === 0;
  const briefcase = variant % 3 === 0;

  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* Pedestal */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.85, 1, 0.1, 48]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.04, 48]} />
        <GoldMaterial emissive={0.5} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.18, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.13, 0.9, 8, 16]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0.18, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.13, 0.9, 8, 16]} />
        <GoldMaterial />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <capsuleGeometry args={[0.38, 0.6, 8, 16]} />
        <GoldMaterial />
      </mesh>
      {/* Tie */}
      <mesh position={[0, 1.5, 0.39]}>
        <boxGeometry args={[0.12, 0.55, 0.02]} />
        <meshStandardMaterial color="#e85d3a" metalness={0.4} roughness={0.5} emissive="#3a1208" emissiveIntensity={0.3} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.55, 1.45, 0]} rotation={[0, 0, 0.15]} castShadow>
        <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0.55, 1.45, 0]} rotation={[0, 0, -0.15]} castShadow>
        <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
        <GoldMaterial />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.15, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <GoldMaterial emissive={0.35} />
      </mesh>

      {/* Hat */}
      {hat && (
        <>
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.25, 32]} />
            <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.38, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.04, 32]} />
            <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.62, 0]}>
            <torusGeometry args={[0.32, 0.025, 8, 32]} />
            <GoldMaterial emissive={0.6} />
          </mesh>
        </>
      )}

      {/* Briefcase */}
      {briefcase && (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
          <group position={[0.78, 0.85, 0.2]}>
            <mesh>
              <boxGeometry args={[0.35, 0.25, 0.1]} />
              <meshStandardMaterial color="#2a1a08" metalness={0.4} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <torusGeometry args={[0.07, 0.012, 8, 24, Math.PI]} />
              <GoldMaterial />
            </mesh>
          </group>
        </Float>
      )}

      {/* Price tag dangling */}
      <Float speed={2} floatIntensity={0.4}>
        <group position={[-0.6, 1.9, 0.3]} rotation={[0, 0, -0.3]}>
          <mesh>
            <boxGeometry args={[0.28, 0.16, 0.02]} />
            <meshStandardMaterial color={GOLD_LIGHT} metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[0.13, 0, 0]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color={GOLD} metalness={1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export const GroomMannequin = ({ variant = 0 }: { variant?: number }) => (
  <Canvas
    camera={{ position: [0, 1, 4.2], fov: 45 }}
    dpr={[1, 2]}
    shadows
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.4} />
    <directionalLight position={[3, 5, 3]} intensity={1.4} color={GOLD_LIGHT} castShadow />
    <directionalLight position={[-3, 2, -2]} intensity={0.6} color={GOLD} />
    <pointLight position={[0, 2, 3]} intensity={0.8} color={GOLD_LIGHT} />
    <Suspense fallback={null}>
      <Mannequin variant={variant} />
      <ContactShadows position={[0, -1.25, 0]} opacity={0.5} scale={4} blur={2.5} far={2} />
      <Environment preset="sunset" />
    </Suspense>
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.8}
      autoRotate
      autoRotateSpeed={1.2}
    />
  </Canvas>
);
