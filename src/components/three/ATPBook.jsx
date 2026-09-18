import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import coverTextureImg from "../../assets/atp-cover-front-flat.png";
import spineTextureImg from "../../assets/atp-spine-flat.png";

// Exact 2:3 aspect ratio matching 800x1200 texture
const HEIGHT = 3.6;
const WIDTH = 2.4; // 2.4 / 3.6 = 0.6667
const COVER_THICKNESS = 0.045; // Subtle, realistic hardcover board thickness
const BOOK_DEPTH = 0.36; // Substantial, realistic book thickness matching reference
const SPINE_R = BOOK_DEPTH / 2; // 0.18 radius for curved semi-cylindrical spine
const PAGE_DEPTH = BOOK_DEPTH - 2 * COVER_THICKNESS; // 0.27 internal page block depth
const PAGE_WIDTH = WIDTH - 0.08; // 2.32 (0.08 overhang on outer right edge)
const PAGE_HEIGHT = HEIGHT - 0.08; // 3.52 (0.04 overhang on top and bottom)
const HINGE_Z = SPINE_R - COVER_THICKNESS / 2; // 0.1575 hinge pivot axis Z

function ATPBook({ progressRef, reducedMotion = false }) {
  const bookRoot = useRef();
  const coverHinge = useRef();
  const pageBundles = useRef([]);

  const [coverTexture, spineTexture] = useTexture(
    [coverTextureImg, spineTextureImg],
    ([cover, spine]) => {
      cover.colorSpace = THREE.SRGBColorSpace;
      spine.colorSpace = THREE.SRGBColorSpace;
      spine.wrapS = THREE.ClampToEdgeWrapping;
      spine.wrapT = THREE.ClampToEdgeWrapping;
    }
  );

  useFrame((_, delta) => {
    if (!bookRoot.current || !coverHinge.current) return;
    const progress = progressRef.current;

    // Stage 1 & 2: Closed book (0.0 - 0.20)
    // Stage 3 & 4: Cover opens smoothly from left spine (0.20 - 0.36)
    // Stage 5+: Remains open as the stable physical foundation
    const openProgress = THREE.MathUtils.smoothstep(progress, 0.20, 0.36);
    const returnProgress = THREE.MathUtils.smoothstep(progress, 0.96, 1.0);
    const open = openProgress * (1 - returnProgress * 0.12);

    // Hinge rotation strictly around spine: 0 (closed) to -155 degrees
    const targetCoverAngle = reducedMotion ? -0.15 : -open * (Math.PI * 0.86);

    // Book root position and rotation
    // Closed state matches the 3/4 perspective of the reference image
    const targetGroupX = reducedMotion
      ? -WIDTH / 2 + 0.12
      : THREE.MathUtils.lerp(-WIDTH / 2 + 0.12, -WIDTH / 2 - 0.22, openProgress);
    const targetGroupY = reducedMotion
      ? 0.02
      : THREE.MathUtils.lerp(0.02, -0.05, openProgress);
    const targetGroupZ = reducedMotion
      ? 0
      : THREE.MathUtils.lerp(0, 0.10, openProgress);

    const targetRotY = reducedMotion
      ? -0.22
      : THREE.MathUtils.lerp(-0.25, -0.06, openProgress);
    const targetRotX = reducedMotion
      ? 0.04
      : THREE.MathUtils.lerp(0.04, 0.06, openProgress);

    bookRoot.current.position.x = THREE.MathUtils.damp(bookRoot.current.position.x, targetGroupX, 5, delta);
    bookRoot.current.position.y = THREE.MathUtils.damp(bookRoot.current.position.y, targetGroupY, 5, delta);
    bookRoot.current.position.z = THREE.MathUtils.damp(bookRoot.current.position.z, targetGroupZ, 5, delta);
    bookRoot.current.rotation.x = THREE.MathUtils.damp(bookRoot.current.rotation.x, targetRotX, 4, delta);
    bookRoot.current.rotation.y = THREE.MathUtils.damp(bookRoot.current.rotation.y, targetRotY, 4, delta);

    // Cover rotation from spine hinge
    coverHinge.current.rotation.y = THREE.MathUtils.damp(coverHinge.current.rotation.y, targetCoverAngle, 6, delta);

    // Internal turning pages as cover opens (constant dimensions, no scaling)
    pageBundles.current.forEach((page, index) => {
      if (!page) return;
      const turnProgress = reducedMotion
        ? 0
        : THREE.MathUtils.smoothstep(progress, 0.24 + index * 0.03, 0.36 + index * 0.03);
      const pageAngle = -turnProgress * (Math.PI * 0.78);
      page.rotation.y = THREE.MathUtils.damp(page.rotation.y, pageAngle, 5, delta);
    });
  });

  return (
    <group ref={bookRoot} rotation={[0.04, -0.25, -0.005]} position={[-WIDTH / 2 + 0.12, 0.02, 0]}>
      {/* ======================================================= */}
      {/* 1. BACK COVER (Solid Hardcover Board, Deep Navy)       */}
      {/* ======================================================= */}
      <mesh
        castShadow
        receiveShadow
        position={[WIDTH / 2, 0, -SPINE_R + COVER_THICKNESS / 2]}
      >
        <boxGeometry args={[WIDTH, HEIGHT, COVER_THICKNESS]} />
        <meshStandardMaterial color="#0a1628" roughness={0.78} metalness={0.04} />
      </mesh>

      {/* ======================================================= */}
      {/* 2. ROUNDED SPINE (Thick curved semi-cylinder on LEFT)   */}
      {/* ======================================================= */}
      <group position={[0, 0, 0]}>
        {/* Curved semi-cylindrical spine mesh */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry
            args={[SPINE_R, SPINE_R, HEIGHT, 32, 1, false, Math.PI, Math.PI]}
          />
          <meshStandardMaterial
            map={spineTexture}
            color="#ffffff"
            roughness={0.65}
            metalness={0.04}
          />
        </mesh>

        {/* Top spine solid cloth cap */}
        <mesh position={[0, HEIGHT / 2 - 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[SPINE_R, 32, 0, Math.PI]} />
          <meshStandardMaterial color="#091424" roughness={0.8} />
        </mesh>

        {/* Bottom spine solid cloth cap */}
        <mesh position={[0, -HEIGHT / 2 + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[SPINE_R, 32, 0, Math.PI]} />
          <meshStandardMaterial color="#091424" roughness={0.8} />
        </mesh>

        {/* Front hinge French groove / crease line */}
        <mesh position={[0.008, 0, SPINE_R - 0.004]}>
          <boxGeometry args={[0.018, HEIGHT - 0.002, 0.012]} />
          <meshStandardMaterial color="#07101b" roughness={0.9} />
        </mesh>

        {/* Back hinge French groove / crease line */}
        <mesh position={[0.008, 0, -SPINE_R + 0.004]}>
          <boxGeometry args={[0.018, HEIGHT - 0.002, 0.012]} />
          <meshStandardMaterial color="#07101b" roughness={0.9} />
        </mesh>
      </group>

      {/* ======================================================= */}
      {/* 3. PAGE BLOCK (Warm ivory pages completely inside)     */}
      {/* ======================================================= */}
      <group position={[0.02 + PAGE_WIDTH / 2, 0, 0]}>
        {/* Solid trimmed text block */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, PAGE_DEPTH]} />
          <meshStandardMaterial color="#faf6ee" roughness={0.92} />
        </mesh>

        {/* Top compressed paper edge lines */}
        <mesh position={[0, PAGE_HEIGHT / 2 - 0.004, 0]}>
          <boxGeometry args={[PAGE_WIDTH - 0.01, 0.008, PAGE_DEPTH - 0.008]} />
          <meshStandardMaterial color="#efe5d5" roughness={0.95} />
        </mesh>

        {/* Bottom compressed paper edge lines */}
        <mesh position={[0, -PAGE_HEIGHT / 2 + 0.004, 0]}>
          <boxGeometry args={[PAGE_WIDTH - 0.01, 0.008, PAGE_DEPTH - 0.008]} />
          <meshStandardMaterial color="#efe5d5" roughness={0.95} />
        </mesh>

        {/* Outer right compressed paper edge lines */}
        <mesh position={[PAGE_WIDTH / 2 - 0.004, 0, 0]}>
          <boxGeometry args={[0.008, PAGE_HEIGHT - 0.01, PAGE_DEPTH - 0.008]} />
          <meshStandardMaterial color="#eae0ce" roughness={0.95} />
        </mesh>
      </group>

      {/* ======================================================= */}
      {/* 4. INTERNAL BASE PAGE (Revealed when book opens)        */}
      {/* ======================================================= */}
      <group position={[0.02, 0, PAGE_DEPTH / 2 - 0.002]}>
        <mesh position={[PAGE_WIDTH / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial color="#faf6ee" roughness={0.94} />
        </mesh>
        {/* Subtle academic inner border & typography layout */}
        <mesh position={[PAGE_WIDTH / 2, 0, 0.001]}>
          <planeGeometry args={[PAGE_WIDTH - 0.24, PAGE_HEIGHT - 0.24]} />
          <meshBasicMaterial color="#e5ddce" wireframe />
        </mesh>
        {/* Chapter header bar */}
        <mesh position={[PAGE_WIDTH / 2, 0.90, 0.002]}>
          <planeGeometry args={[PAGE_WIDTH * 0.65, 0.035]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        {/* Academic blue subtitle rule */}
        <mesh position={[PAGE_WIDTH / 2, 0.76, 0.002]}>
          <planeGeometry args={[PAGE_WIDTH * 0.45, 0.02]} />
          <meshBasicMaterial color="#2563eb" />
        </mesh>
        {/* Academic study lines */}
        {[-0.05, -0.25, -0.45, -0.65, -0.85].map((y) => (
          <mesh key={y} position={[PAGE_WIDTH / 2, y, 0.002]}>
            <planeGeometry args={[PAGE_WIDTH * 0.72, 0.014]} />
            <meshBasicMaterial color="#d8cebf" />
          </mesh>
        ))}
      </group>

      {/* ======================================================= */}
      {/* 5. PAGE BUNDLES (3 turning leaves, constant dimension)  */}
      {/* ======================================================= */}
      {Array.from({ length: 3 }).map((_, index) => (
        <group
          key={`turning-page-${index}`}
          ref={(node) => {
            pageBundles.current[index] = node;
          }}
          position={[0.02, 0, PAGE_DEPTH / 2 - 0.006 - index * 0.007]}
        >
          <mesh position={[PAGE_WIDTH / 2, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, 0.003]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#faf6ee" : "#f6f1e6"}
              roughness={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* ======================================================= */}
      {/* 6. FRONT COVER PIVOT & FRONT COVER                      */}
      {/* ======================================================= */}
      {/* Pivot placed strictly at the spine hinge edge (X = 0, Z = HINGE_Z) */}
      <group ref={coverHinge} position={[0, 0, HINGE_Z]}>
        {/* Child board offset so left edge aligns with pivot axis */}
        <group position={[WIDTH / 2, 0, 0]}>
          {/* Solid hardcover board core */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[WIDTH, HEIGHT, COVER_THICKNESS]} />
            <meshStandardMaterial color="#0a1628" roughness={0.78} metalness={0.04} />
          </mesh>

          {/* FRONT COVER FACE (+Z): Exact user-provided artwork, unclipped, 2:3 ratio */}
          <mesh position={[0, 0, COVER_THICKNESS / 2 + 0.0006]} receiveShadow>
            <planeGeometry args={[WIDTH, HEIGHT]} />
            <meshStandardMaterial
              map={coverTexture}
              color="#ffffff"
              roughness={0.68}
              metalness={0.03}
            />
          </mesh>

          {/* INSIDE FRONT COVER (-Z): Academic Endpaper visible when opened */}
          <group position={[0, 0, -COVER_THICKNESS / 2 - 0.0006]} rotation={[0, Math.PI, 0]}>
            <mesh receiveShadow>
              <planeGeometry args={[WIDTH, HEIGHT]} />
              <meshStandardMaterial color="#0f1d32" roughness={0.82} metalness={0.04} />
            </mesh>
            {/* Inner gold foil frame on endpaper */}
            <mesh position={[0, 0, 0.001]}>
              <planeGeometry args={[WIDTH - 0.28, HEIGHT - 0.28]} />
              <meshBasicMaterial color="#c79a45" wireframe />
            </mesh>
            <mesh position={[0, 0, 0.002]}>
              <planeGeometry args={[WIDTH - 0.36, HEIGHT - 0.36]} />
              <meshStandardMaterial color="#162740" roughness={0.85} />
            </mesh>
            {/* Bookplate Monogram Plaque */}
            <mesh position={[0, 0.2, 0.003]}>
              <planeGeometry args={[0.9, 0.6]} />
              <meshStandardMaterial color="#faf6ee" roughness={0.92} />
            </mesh>
            <mesh position={[0, 0.2, 0.004]}>
              <planeGeometry args={[0.82, 0.52]} />
              <meshBasicMaterial color="#c79a45" wireframe />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export default ATPBook;
