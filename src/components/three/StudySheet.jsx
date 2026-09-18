import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Constant physical sheet dimensions — ZERO scaling
const SHEET_W = 1.48;
const SHEET_H = 2.05;

// Origin tucked physically inside the book's right page block
const ORIGIN_POS = [0.12, 0, 0.14];

// Final balanced composition positions matching user specification
const TARGET_POSITIONS = {
  textbook: [0, 1.45, -0.42],        // Top / rear
  notes: [-1.45, 0.45, 0.65],        // Front-left
  revision: [1.42, 0.45, 0.65],       // Front-right
  pyq: [1.36, 1.35, -0.28],          // Right / rear
  important: [1.38, -0.85, 0.78],    // Lower-right
  quick: [-1.32, -0.9, 0.95],        // Lower-left / near viewer
};

const TARGET_ROTATIONS = {
  textbook: [0.06, 0, 0],
  notes: [0.05, 0.18, -0.10],
  revision: [-0.04, -0.16, 0.08],
  pyq: [0.06, -0.14, 0.06],
  important: [-0.08, 0.14, -0.06],
  quick: [0.10, 0.18, -0.08],
};

const SHEET_METAS = {
  textbook: {
    category: "TEXTBOOK REFERENCED",
    title: "Complete Textbook Material",
    subtext: "Core concepts, organised clearly",
    accent: "#315c8c",
  },
  notes: {
    category: "SIMPLIFIED CONCEPTS",
    title: "Notes",
    subtext: "Simplified for better understanding",
    accent: "#0f172a",
  },
  revision: {
    category: "HIGH-YIELD SUMMARY",
    title: "Revision Notes",
    subtext: "Faster second-round revision",
    accent: "#813e51",
  },
  pyq: {
    category: "EXAM SOLVED PAPERS",
    title: "Complete PYQ",
    subtext: "Practice with previous year questions",
    accent: "#1d4ed8",
    badges: ["Before 2024 Scheme", "2024 Scheme & After"],
  },
  important: {
    category: "EXAM PRIORITY BANK",
    title: "Important Questions",
    subtext: "Focus your revision smarter",
    accent: "#813e51",
  },
  quick: {
    category: "RAPID RECALL DECK",
    title: "Quick Revision",
    subtext: "Built for final study hours",
    accent: "#c79a45",
  },
};

function createSheetTexture(kind) {
  const meta = SHEET_METAS[kind] || SHEET_METAS.notes;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 708;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#fffdfa";
  ctx.fillRect(0, 0, 512, 708);

  // Outer paper border
  ctx.strokeStyle = "#e8dfce";
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 480, 676);

  // Inner gold hairline
  ctx.strokeStyle = "#dfc38a";
  ctx.lineWidth = 1;
  ctx.strokeRect(24, 24, 464, 660);

  // Top Category Pill
  ctx.fillStyle = meta.accent;
  ctx.fillRect(40, 48, 220, 24);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px sans-serif";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(meta.category, 52, 64);

  // Gold Divider Line
  ctx.fillStyle = "#c79a45";
  ctx.fillRect(40, 84, 432, 2);

  // Main Title
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 26px serif";
  ctx.fillText(meta.title, 40, 126);

  // Subtitle
  ctx.fillStyle = "#4b5563";
  ctx.font = "italic 16px serif";
  ctx.fillText(meta.subtext, 40, 156);

  // Simulated Academic Content Lines
  ctx.fillStyle = "#e2d9c8";
  for (let y = 196; y < 560; y += 28) {
    const lineWidth = 340 + Math.sin(y) * 80;
    ctx.fillRect(40, y, lineWidth, 8);
  }

  // PYQ Specific Scheme Badges
  if (meta.badges) {
    ctx.fillStyle = "#813e51";
    ctx.fillRect(40, 576, 200, 36);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("• Before 2024 Scheme", 54, 599);

    ctx.fillStyle = "#c79a45";
    ctx.fillRect(256, 576, 216, 36);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("• 2024 Scheme & After", 270, 599);
  } else {
    // Bottom Seal Accent
    ctx.fillStyle = "#f5f0e6";
    ctx.fillRect(40, 624, 432, 36);
    ctx.fillStyle = "#b58838";
    ctx.font = "bold 11px sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("ATP REVISION VAULT — ACADEMIC EDITION", 78, 646);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.anisotropy = 4;
  return texture;
}

function StudySheet({ index, kind, revealStart, progressRef, reducedMotion = false }) {
  const group = useRef();
  const phaseEnd = revealStart + 0.08;

  const texture = useMemo(() => createSheetTexture(kind), [kind]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const progress = progressRef.current;

    // Smooth emergence parameter (0 when inside book, 1 when fully floated out)
    const reveal = reducedMotion
      ? 1
      : THREE.MathUtils.smoothstep(progress, revealStart, phaseEnd);

    // Opacity fades in cleanly as sheet lifts out of book
    const opacity = reducedMotion ? 1 : THREE.MathUtils.clamp(reveal * 1.25, 0, 1);
    group.current.visible = opacity > 0.01;

    const targetPos = TARGET_POSITIONS[kind] || [0, 0, 1];
    const targetRot = TARGET_ROTATIONS[kind] || [0, 0, 0];

    // Constant dimensions: interpolate position from book block to target position
    const currentX = THREE.MathUtils.lerp(ORIGIN_POS[0], targetPos[0], reveal);
    const currentY = THREE.MathUtils.lerp(ORIGIN_POS[1], targetPos[1], reveal);
    const currentZ = THREE.MathUtils.lerp(ORIGIN_POS[2] + index * 0.015, targetPos[2], reveal);

    const currentRx = THREE.MathUtils.lerp(0, targetRot[0], reveal);
    const currentRy = THREE.MathUtils.lerp(0, targetRot[1], reveal);
    const currentRz = THREE.MathUtils.lerp(0, targetRot[2], reveal);

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, currentX, 5, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, currentY, 5, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, currentZ, 5, delta);

    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, currentRx, 5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, currentRy, 5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, currentRz, 5, delta);
  });

  return (
    <group ref={group} visible={false}>
      {/* Subtle Paper Drop Shadow */}
      <mesh position={[0.04, -0.04, -0.015]} castShadow>
        <planeGeometry args={[SHEET_W, SHEET_H]} />
        <meshBasicMaterial color="#0c1828" transparent opacity={0.08} />
      </mesh>

      {/* Main Sheet Plane with Crisp Academic Canvas Texture */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[SHEET_W, SHEET_H]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default StudySheet;
