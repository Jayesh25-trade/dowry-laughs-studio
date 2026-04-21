import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Text3D, Center, Trail, Sparkles } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useScroll, useTransform, MotionValue } from "framer-motion";

// ---------- Floating coin with physics-ish bobbing + trail ----------
function PhysicsCoin({
  origin,
  scale = 1,
  speed = 1,
  drift = 1,
  trailColor = "#f0d78c",
}: {
  origin: [number, number, number];
  scale?: number;
  speed?: number;
  drift?: number;
  trailColor?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * 100, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + seed;
    // Pseudo-physics: orbit + bobbing + spin
    ref.current.position.x = origin[0] + Math.sin(t * 0.6) * drift;
    ref.current.position.y = origin[1] + Math.cos(t * 0.8) * drift * 0.7;
    ref.current.position.z = origin[2] + Math.sin(t * 0.4) * drift * 0.5;
    ref.current.rotation.y = t * 1.4;
    ref.current.rotation.x = Math.sin(t) * 0.3;
  });
  return (
    <Trail width={0.6} length={5} color={trailColor} attenuation={(w) => w * w}>
      <mesh ref={ref} position={origin} scale={scale}>
        <cylinderGeometry args={[0.7, 0.7, 0.12, 64]} />
        <meshStandardMaterial
          color="#c9a84c"
          metalness={1}
          roughness={0.15}
          emissive="#7a5a1a"
          emissiveIntensity={0.35}
        />
      </mesh>
    </Trail>
  );
}

function CrackedRupee() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
  });
  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Center>
          <Suspense fallback={null}>
            <Text3D
              font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
              size={2.6}
              height={0.55}
              bevelEnabled
              bevelSize={0.05}
              bevelThickness={0.1}
              curveSegments={16}
            >
              ₹
              <MeshDistortMaterial
                color="#c9a84c"
                metalness={0.95}
                roughness={0.18}
                distort={0.22}
                speed={1.4}
                emissive="#5a3f0f"
                emissiveIntensity={0.4}
              />
            </Text3D>
          </Suspense>
        </Center>
      </Float>
    </group>
  );
}

// ---------- Scroll-driven camera ----------
function ScrollCamera({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress.get();
    camera.position.x = Math.sin(p * Math.PI * 0.7) * 3;
    camera.position.y = p * -2.5;
    camera.position.z = 8 - p * 2.5;
    camera.lookAt(0, p * -1.2, 0);
  });
  return null;
}

export const HeroScene = ({ scrollProgress }: { scrollProgress?: MotionValue<number> }) => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 6, 24]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#f0d78c" />
      <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#c9a84c" />
      <pointLight position={[0, 0, 4]} intensity={1.2} color="#f0d78c" />
      <pointLight position={[-4, 2, -3]} intensity={0.8} color="#e85d3a" />

      <Suspense fallback={null}>
        <CrackedRupee />
        {/* Floating coin physics around the rupee */}
        <PhysicsCoin origin={[-3.2, 1.6, -1]} scale={0.6} speed={0.8} drift={0.6} />
        <PhysicsCoin origin={[3.4, -1.4, -0.5]} scale={0.8} speed={0.6} drift={0.8} />
        <PhysicsCoin origin={[-2.8, -1.8, 1]} scale={0.5} speed={1.1} drift={0.5} />
        <PhysicsCoin origin={[3, 1.8, 1.2]} scale={0.45} speed={1.3} drift={0.7} />
        <PhysicsCoin origin={[0, 2.8, -2]} scale={0.4} speed={0.9} drift={0.9} />
        <PhysicsCoin origin={[-4, 0.2, 0.5]} scale={0.35} speed={1.5} drift={0.4} />
        <PhysicsCoin origin={[4.2, 0.8, -1.5]} scale={0.5} speed={0.7} drift={0.6} />

        {/* Gold particle dust */}
        <Sparkles count={120} scale={14} size={3} speed={0.4} color="#f0d78c" />
        <Sparkles count={60} scale={20} size={1.5} speed={0.2} color="#c9a84c" />

        <Environment preset="sunset" />
      </Suspense>

      {scrollProgress && <ScrollCamera progress={scrollProgress} />}
    </Canvas>
  );
};

export const FloatingCoins = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[3, 3, 3]} intensity={1} color="#f0d78c" />
    <Suspense fallback={null}>
      <PhysicsCoin origin={[-1.8, 0.8, 0]} scale={0.5} speed={0.7} drift={0.5} />
      <PhysicsCoin origin={[1.6, -0.6, 0.5]} scale={0.6} speed={0.9} drift={0.6} />
      <PhysicsCoin origin={[0, 1.2, -1]} scale={0.4} speed={1.1} drift={0.4} />
      <Sparkles count={40} scale={8} size={2} speed={0.3} color="#f0d78c" />
      <Environment preset="sunset" />
    </Suspense>
  </Canvas>
);
