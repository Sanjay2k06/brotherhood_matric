/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = (d: number) => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED = 0.005;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(6);
const HOVER_EASE = 0.15;

const Loader = ({ placeholderSrc }: { placeholderSrc?: string }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      {placeholderSrc ? (
        <img src={placeholderSrc} width={128} height={128} className="blur-lg rounded-lg" />
      ) : (
        <div className="bg-black/80 text-white rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap">
          {Math.round(progress)} % loaded
        </div>
      )}
    </Html>
  );
};

const DesktopControls = ({ pivot, min, max, zoomEnabled }: { pivot: THREE.Vector3; min: number; max: number; zoomEnabled: boolean }) => {
  const ref = useRef<any>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.target.copy(pivot);
    }
  });
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={false}
      enableZoom={zoomEnabled}
      minDistance={min}
      maxDistance={max}
    />
  );
};

interface ModelInnerProps {
  url: string;
  xOff: number;
  yOff: number;
  pivot: THREE.Vector3;
  initYaw: number;
  initPitch: number;
  minZoom: number;
  maxZoom: number;
  enableMouseParallax: boolean;
  enableManualRotation: boolean;
  enableHoverRotation: boolean;
  enableManualZoom: boolean;
  autoFrame: boolean;
  fadeIn: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  onLoaded?: () => void;
}

const ModelInner = ({
  url,
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  minZoom,
  maxZoom,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  enableManualZoom,
  autoFrame,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded
}: ModelInnerProps) => {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });

  const ext = useMemo(() => url.split('.').pop()?.toLowerCase() || '', [url]);
  const content = useMemo(() => {
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();
    if (ext === 'fbx') return useFBX(url).clone();
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();
    console.error('Unsupported format:', ext);
    return null;
  }, [url, ext]);

  const pivotW = useRef(new THREE.Vector3());
  useLayoutEffect(() => {
    if (!content || !inner.current || !outer.current) return;
    const g = inner.current;
    g.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
    const s = 1 / (sphere.radius * 2);
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    g.scale.setScalar(s);

    g.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }
      }
    });

    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);
    outer.current.rotation.set(initPitch, initYaw, 0);

    if (autoFrame && camera.isPerspectiveCamera) {
      const persp = camera as THREE.PerspectiveCamera;
      const fitR = sphere.radius * s;
      const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);
      persp.near = d / 10;
      persp.far = d * 10;
      persp.updateProjectionMatrix();
    }

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const v = Math.min(t, 1);
        g.traverse((o: any) => {
          if (o.isMesh) o.material.opacity = v;
        });
        invalidate();
        if (v === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => clearInterval(id);
    } else {
      onLoaded?.();
    }
  }, [content, autoFrame, camera, fadeIn, initPitch, initYaw, pivot, onLoaded]);

  useEffect(() => {
    if (!enableManualRotation || isTouch) return;
    const el = gl.domElement;
    let drag = false;
    let lx = 0, ly = 0;
    
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      window.addEventListener('pointerup', up);
    };

    const move = (e: PointerEvent) => {
      if (!drag || !outer.current) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      outer.current.rotation.y += dx * ROTATE_SPEED;
      outer.current.rotation.x += dy * ROTATE_SPEED;
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };

    const up = () => {
      drag = false;
      window.removeEventListener('pointerup', up);
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [gl, enableManualRotation]);

  useFrame((state) => {
    if (!outer.current || !inner.current) return;

    // Apply auto rotate if enabled
    if (autoRotate && !isTouch) {
      outer.current.rotation.y += autoRotateSpeed * 0.01;
    }

    // Parallax logic
    if (enableMouseParallax && !isTouch) {
      const { x, y } = state.pointer;
      tPar.current.x = x * PARALLAX_MAG;
      tPar.current.y = -y * PARALLAX_MAG;
    } else {
      tPar.current.x = 0;
      tPar.current.y = 0;
    }

    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;

    // Hover rotation logic
    if (enableHoverRotation && !isTouch) {
      const { x, y } = state.pointer;
      tHov.current.x = x * HOVER_MAG;
      tHov.current.y = -y * HOVER_MAG;
    } else {
      tHov.current.x = 0;
      tHov.current.y = 0;
    }

    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;

    outer.current.position.x = xOff + cPar.current.x;
    outer.current.position.y = yOff + cPar.current.y;

    inner.current.rotation.y = cHov.current.x;
    inner.current.rotation.x = cHov.current.y;
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        {content && <primitive object={content} />}
      </group>
    </group>
  );
};

interface ModelViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  modelXOffset?: number;
  modelYOffset?: number;
  defaultRotationX?: number;
  defaultRotationY?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  enableManualZoom?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  fillLightIntensity?: number;
  rimLightIntensity?: number;
  environmentPreset?: any;
  autoFrame?: boolean;
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  showScreenshotButton?: boolean;
  placeholderSrc?: string;
  onModelLoaded?: () => void;
}

export default function ModelViewer({
  url,
  width = 400,
  height = 400,
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -50,
  defaultRotationY = 20,
  defaultZoom = 2,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.3,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.8,
  environmentPreset = "forest",
  autoFrame = false,
  fadeIn = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  showScreenshotButton = true,
  placeholderSrc,
  onModelLoaded
}: ModelViewerProps) {
  const pivot = useMemo(() => new THREE.Vector3(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScreenshot = () => {
    if (!canvasRef.current) return;
    const urlStr = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = urlStr;
    a.download = 'model-screenshot.png';
    a.click();
  };

  return (
    <div className="relative group overflow-hidden bg-neutral-950/20 rounded-2xl border border-white/5" style={{ width, height }}>
      <Canvas
        ref={canvasRef}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: [0, 0, defaultZoom], fov: 45 }}
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[5, 10, 5]} intensity={keyLightIntensity} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={fillLightIntensity} />
        <directionalLight position={[0, -5, 0]} intensity={rimLightIntensity} />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            xOff={modelXOffset}
            yOff={modelYOffset}
            pivot={pivot}
            initYaw={deg2rad(defaultRotationY)}
            initPitch={deg2rad(defaultRotationX)}
            minZoom={minZoomDistance}
            maxZoom={maxZoomDistance}
            enableMouseParallax={enableMouseParallax}
            enableManualRotation={enableManualRotation}
            enableHoverRotation={enableHoverRotation}
            enableManualZoom={enableManualZoom}
            autoFrame={autoFrame}
            fadeIn={fadeIn}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            onLoaded={onModelLoaded}
          />
          {environmentPreset && <Environment preset={environmentPreset} />}
          <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={10} blur={2} far={1} />
        </Suspense>

        <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />
      </Canvas>

      {showScreenshotButton && (
        <button
          onClick={handleScreenshot}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black text-white text-xs font-semibold py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-white/10"
        >
          Capture Frame
        </button>
      )}
    </div>
  );
}
