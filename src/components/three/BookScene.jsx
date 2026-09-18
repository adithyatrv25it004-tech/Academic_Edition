import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import ATPBook from "./ATPBook";
import StudySheet from "./StudySheet";

// 6-Step Feature sequence matching user specification:
// 1. Complete Textbook-Referenced Material (0.38)
// 2. Notes (0.48)
// 3. Revision Notes (0.58)
// 4. Complete PYQ + Scheme Tags (0.68)
// 5. Important Questions (0.78)
// 6. Quick Revision (0.86)
// 7. Strictly Syllabus-Focused Seal (0.91)
const SHEETS = [
  { kind: "textbook", revealStart: 0.38 },
  { kind: "notes", revealStart: 0.48 },
  { kind: "revision", revealStart: 0.58 },
  { kind: "pyq", revealStart: 0.68 },
  { kind: "important", revealStart: 0.78 },
  { kind: "quick", revealStart: 0.86 },
];

const MOBILE_KINDS = new Set(["notes", "revision", "pyq", "important"]);

function SyllabusSeal({ progressRef, reducedMotion }) {
  const seal = useRef();

  useFrame((_, delta) => {
    if (!seal.current) return;
    const progress = progressRef.current;
    // Stage 12: Strictly Syllabus-Focused Seal (0.90 - 0.96)
    const visible = reducedMotion ? 1 : THREE.MathUtils.smoothstep(progress, 0.90, 0.96);
    seal.current.visible = visible > 0.01;

    const targetX = THREE.MathUtils.lerp(-0.05, -0.05, visible);
    const targetY = THREE.MathUtils.lerp(0.2, -1.35, visible);
    const targetZ = THREE.MathUtils.lerp(0.2, 1.15, visible);

    seal.current.position.x = THREE.MathUtils.damp(seal.current.position.x, targetX, 5, delta);
    seal.current.position.y = THREE.MathUtils.damp(seal.current.position.y, targetY, 5, delta);
    seal.current.position.z = THREE.MathUtils.damp(seal.current.position.z, targetZ, 5, delta);
    seal.current.rotation.z = THREE.MathUtils.damp(seal.current.rotation.z, -0.05 + progress * 0.15, 4, delta);
  });

  return (
    <group ref={seal} position={[-0.05, 0.2, 0.2]}>
      {/* Outer gold notched rim */}
      <mesh castShadow>
        <ringGeometry args={[0.34, 0.44, 36]} />
        <meshStandardMaterial color="#c79a45" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Deep navy academic disc */}
      <mesh position={[0, 0, -0.005]}>
        <circleGeometry args={[0.34, 36]} />
        <meshStandardMaterial color="#0c1828" roughness={0.8} />
      </mesh>
      {/* Inner gold embossed ring */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.22, 0.24, 32]} />
        <meshBasicMaterial color="#dfb657" />
      </mesh>
      {/* Center 8-point academic gold star */}
      <mesh position={[0, 0, 0.012]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.14, 0.14]} />
        <meshBasicMaterial color="#c79a45" />
      </mesh>
      <mesh position={[0, 0, 0.013]}>
        <planeGeometry args={[0.14, 0.14]} />
        <meshBasicMaterial color="#dfb657" />
      </mesh>
    </group>
  );
}

function CameraRig({ progressRef, reducedMotion }) {
  const camera = useRef();
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!camera.current) return;
    const progress = progressRef.current;

    let targetCam;
    let lookTarget;

    if (reducedMotion) {
      targetCam = { x: 0, y: 0.1, z: 6.2 };
      lookTarget = { x: 0, y: 0.05, z: 0 };
    } else if (progress < 0.18) {
      // Stage 1: Closed book clearly visible
      targetCam = { x: 0, y: 0.12, z: 6.2 };
      lookTarget = { x: 0, y: 0.04, z: 0 };
    } else if (progress < 0.28) {
      // Stage 2: Camera approaches slightly
      const t = (progress - 0.18) / 0.10;
      targetCam = {
        x: THREE.MathUtils.lerp(0, -0.02, t),
        y: THREE.MathUtils.lerp(0.12, 0.10, t),
        z: THREE.MathUtils.lerp(6.2, 5.85, t),
      };
      lookTarget = { x: 0, y: 0.04, z: 0 };
    } else if (progress < 0.38) {
      // Stage 3 & 4: Cover opens from spine
      const t = (progress - 0.28) / 0.10;
      targetCam = {
        x: THREE.MathUtils.lerp(-0.02, -0.05, t),
        y: THREE.MathUtils.lerp(0.10, 0.08, t),
        z: THREE.MathUtils.lerp(5.85, 5.8, t),
      };
      lookTarget = { x: 0, y: 0.04, z: 0 };
    } else if (progress < 0.88) {
      // Stage 5 to 11: Features 1 to 6 emerge
      const t = (progress - 0.38) / 0.50;
      targetCam = {
        x: THREE.MathUtils.lerp(-0.05, 0, t),
        y: 0.08,
        z: THREE.MathUtils.lerp(5.8, 6.0, t),
      };
      lookTarget = { x: 0, y: 0.04, z: 0 };
    } else {
      // Stage 12 & 13: Seal & final balanced composition
      const t = (progress - 0.88) / 0.12;
      targetCam = {
        x: 0,
        y: THREE.MathUtils.lerp(0.08, 0.05, t),
        z: THREE.MathUtils.lerp(6.0, 6.4, t),
      };
      lookTarget = { x: 0, y: 0.04, z: 0 };
    }

    camera.current.position.x = THREE.MathUtils.damp(camera.current.position.x, targetCam.x, 3.5, delta);
    camera.current.position.y = THREE.MathUtils.damp(camera.current.position.y, targetCam.y, 3.5, delta);
    camera.current.position.z = THREE.MathUtils.damp(camera.current.position.z, targetCam.z, 3.5, delta);

    target.current.x = THREE.MathUtils.damp(target.current.x, lookTarget.x, 3.5, delta);
    target.current.y = THREE.MathUtils.damp(target.current.y, lookTarget.y, 3.5, delta);
    target.current.z = THREE.MathUtils.damp(target.current.z, lookTarget.z, 3.5, delta);

    camera.current.lookAt(target.current);
  });

  return <PerspectiveCamera ref={camera} makeDefault position={[0, 0.12, 6.2]} fov={34} />;
}

function SceneContent({ progressRef, reducedMotion, pointer, visibleSheets }) {
  const group = useRef();

  useFrame((_, delta) => {
    if (!group.current) return;
    const pointerX = reducedMotion ? 0 : pointer.current.x * 0.025;
    const pointerY = reducedMotion ? 0 : pointer.current.y * 0.018;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointerX, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointerY, 4, delta);
  });

  return (
    <>
      <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
      <ambientLight intensity={1.35} color="#f7f3ea" />
      <directionalLight castShadow position={[3, 5, 6]} intensity={3.2} color="#fff8ec" shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 1, 2]} intensity={1.6} color="#c6d8ec" />
      <pointLight position={[0, -1, 3]} intensity={1.1} color="#f2dca9" />
      <Environment preset="studio" environmentIntensity={0.3} />
      <group ref={group} scale={0.84}>
        <ATPBook progressRef={progressRef} reducedMotion={reducedMotion} />
        {!reducedMotion && visibleSheets.map((sheet, index) => (
          <StudySheet key={sheet.kind} {...sheet} index={index} progressRef={progressRef} reducedMotion={reducedMotion} />
        ))}
        {!reducedMotion && <SyllabusSeal progressRef={progressRef} reducedMotion={reducedMotion} />}
      </group>
      <ContactShadows position={[0, -2.05, 0]} opacity={0.3} scale={8} blur={2.8} far={5} color="#172033" />
    </>
  );
}

function BookScene({ progressRef, progress = 0, reducedMotion = false, pointer, mobile = false }) {
  const fallbackPointer = useRef({ x: 0, y: 0 });
  const fallbackProgress = useRef(progress);
  const timelineProgress = progressRef || fallbackProgress;
  const visibleSheets = mobile ? SHEETS.filter((sheet) => MOBILE_KINDS.has(sheet.kind)) : SHEETS;
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 0);
      }}
    >
      <Suspense fallback={null}>
        <SceneContent progressRef={timelineProgress} reducedMotion={reducedMotion} pointer={pointer || fallbackPointer} visibleSheets={visibleSheets} />
      </Suspense>
    </Canvas>
  );
}

export default BookScene;
