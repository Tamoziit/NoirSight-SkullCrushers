// src/components/EyeViewer.tsx

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function EyeModel() {
  const { scene } = useGLTF('/models/eye.glb');
  return <primitive object={scene} scale={2.5} />;
}

export default function EyeViewer() {
  return (
    <div className="w-full h-[600px] bg-black rounded-lg shadow-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <EyeModel />
          <Environment preset="night" />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
