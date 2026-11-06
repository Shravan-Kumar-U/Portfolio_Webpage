import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Box, Cylinder, Torus, Float, Html } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// This component dynamically adjusts the camera position based on the screen aspect ratio.
// This guarantees the massive desk perfectly fits on all mobile/tablet screens 
// by physically pulling the camera back in 3D space, instead of shrinking the model.
function ResponsiveCamera() {
  const { camera, size } = useThree();
  
  useFrame(() => {
    const aspect = size.width / size.height;
    
    // Math to ensure a fixed horizontal field of view is maintained.
    // If the screen is very narrow (mobile), it pushes the camera way back (e.g. Z=24)
    // If the screen is wide (desktop), it caps at our ideal close-up position (Z=9)
    const targetZ = Math.max(9, 12 / aspect);
    const targetY = Math.max(2, 3 / aspect);
    
    // Smoothly interpolate the camera to the perfect position
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
  });
  
  return null;
}

function GamingDeskSetup() {
  const pcRef = useRef();
  const fan1Ref = useRef();
  const fan2Ref = useRef();

  useFrame((state, delta) => {
    if (fan1Ref.current) fan1Ref.current.rotation.z -= delta * 8;
    if (fan2Ref.current) fan2Ref.current.rotation.z -= delta * 8;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
      {/* We keep the massive 1.2 scale. The camera handles all responsiveness now. */}
      <group position={[0, 0, 0]} scale={1.2}>
        
        {/* --- DESK SURFACE --- */}
        <Box args={[8, 0.1, 4]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.2} />
        </Box>

        {/* --- MONITOR --- */}
        <group position={[-0.5, 0.05, -0.8]}>
          <Box args={[1.5, 0.05, 0.8]} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#050505" />
          </Box>
          <Box args={[0.2, 0.8, 0.1]} position={[0, 0.4, -0.3]} castShadow receiveShadow>
            <meshStandardMaterial color="#050505" />
          </Box>
          <Box args={[4.2, 2.4, 0.1]} position={[0, 1.5, -0.2]} castShadow receiveShadow>
            <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
          </Box>
          {/* Screen surface — slightly emissive so the HTML overlay is visible */}
          <Box args={[4.0, 2.2, 0.01]} position={[0, 1.5, -0.14]}>
            <meshStandardMaterial color="#1a1a2e" emissive="#0d0d1a" emissiveIntensity={2} />
          </Box>
          
          <Html transform position={[0, 1.5, -0.13]} scale={0.055} occlude>
            <div style={{ width: '740px', height: '400px', background: '#1e1e2e', padding: '24px', fontFamily: '"Fira Code", "Cascadia Code", monospace', fontSize: '18px', overflow: 'hidden', textAlign: 'left', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', boxShadow: '0 0 40px rgba(59,130,246,0.15)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }}></div>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }}></div>
              </div>
              <div style={{ color: '#569cd6', marginTop: '8px', lineHeight: '1.8' }}>import <span style={{ color: '#4ec9b0' }}>React</span> from <span style={{ color: '#ce9178' }}>'react'</span>;</div>
              <div style={{ color: '#569cd6', lineHeight: '1.8' }}>import <span style={{ color: '#4ec9b0' }}>App</span> from <span style={{ color: '#ce9178' }}>'./App'</span>;</div>
              <div style={{ color: '#569cd6', lineHeight: '1.8' }}>import <span style={{ color: '#4ec9b0' }}>ThreeScene</span> from <span style={{ color: '#ce9178' }}>'./components/ThreeScene'</span>;</div>
              <br/>
              <div style={{ color: '#569cd6', lineHeight: '1.8' }}>export default function <span style={{ color: '#dcdcaa' }}>Main</span>() {"{"}</div>
              <div style={{ paddingLeft: '24px', color: '#c586c0', lineHeight: '1.8' }}>return (</div>
              <div style={{ paddingLeft: '48px', color: '#808080', lineHeight: '1.8' }}>&lt;div className="portfolio"&gt;</div>
              <div style={{ paddingLeft: '72px', color: '#4ec9b0', lineHeight: '1.8' }}>&lt;App /&gt;</div>
              <div style={{ paddingLeft: '72px', color: '#4ec9b0', lineHeight: '1.8' }}>&lt;ThreeScene /&gt;</div>
              <div style={{ paddingLeft: '48px', color: '#808080', lineHeight: '1.8' }}>&lt;/div&gt;</div>
              <div style={{ paddingLeft: '24px', color: '#c586c0', lineHeight: '1.8' }}>);</div>
              <div style={{ color: '#569cd6', lineHeight: '1.8' }}>{"}"}</div>
              <div style={{ marginTop: 'auto', color: '#d4d4d4', fontWeight: 'bold', fontSize: '24px', animation: 'pulse 1.5s infinite' }}>_</div>
            </div>
          </Html>
        </group>

        {/* --- SPEAKERS --- */}
        <group position={[-3.2, 0.4, -0.5]}>
          <Box args={[0.4, 0.8, 0.5]} castShadow receiveShadow>
            <meshStandardMaterial color="#050505" roughness={0.8} />
          </Box>
          <Torus args={[0.12, 0.02, 16, 32]} position={[0, 0.2, 0.26]}>
            <meshBasicMaterial color="#00dfd8" />
          </Torus>
          <Torus args={[0.08, 0.015, 16, 32]} position={[0, -0.2, 0.26]}>
            <meshBasicMaterial color="#7928ca" />
          </Torus>
        </group>

        <group position={[2.2, 0.4, -0.5]}>
          <Box args={[0.4, 0.8, 0.5]} castShadow receiveShadow>
            <meshStandardMaterial color="#050505" roughness={0.8} />
          </Box>
          <Torus args={[0.12, 0.02, 16, 32]} position={[0, 0.2, 0.26]}>
            <meshBasicMaterial color="#00dfd8" />
          </Torus>
          <Torus args={[0.08, 0.015, 16, 32]} position={[0, -0.2, 0.26]}>
            <meshBasicMaterial color="#7928ca" />
          </Torus>
        </group>

        {/* --- PC TOWER --- */}
        <group ref={pcRef} position={[3.6, 1.2, -0.5]}>
          <Box args={[1.4, 2.4, 2.4]} castShadow receiveShadow>
            <meshStandardMaterial color="#030303" roughness={0.2} metalness={0.9} />
          </Box>
          <Box args={[0.02, 2.3, 2.3]} position={[-0.71, 0, 0]}>
            <meshPhysicalMaterial color="#000" transparent opacity={0.3} roughness={0} metalness={1} transmission={0.9} ior={1.5} />
          </Box>
          
          <Box args={[0.6, 1.6, 1.6]} position={[0.2, 0.1, -0.2]}>
            <meshStandardMaterial color="#0a0a0a" />
          </Box>
          <Box args={[0.4, 0.4, 0.1]} position={[-0.1, 0.6, -0.5]}>
            <meshBasicMaterial color="#8b5cf6" />
          </Box>
          <Box args={[0.9, 0.3, 1]} position={[-0.1, -0.4, 0]}>
            <meshStandardMaterial color="#111" />
          </Box>
          <Box args={[0.9, 0.02, 0.9]} position={[-0.1, -0.24, 0]}>
            <meshBasicMaterial color="#f43f5e" />
          </Box>

          <group position={[0, 0, 1.2]}>
            <group position={[0, 0.6, 0]}>
              <Cylinder args={[0.4, 0.4, 0.1, 32]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#000" />
              </Cylinder>
              <Torus ref={fan1Ref} args={[0.35, 0.03, 16, 32]} position={[0, 0, 0.06]}>
                <meshBasicMaterial color="#3b82f6" />
              </Torus>
            </group>
            <group position={[0, -0.6, 0]}>
              <Cylinder args={[0.4, 0.4, 0.1, 32]} rotation={[Math.PI/2, 0, 0]}>
                <meshStandardMaterial color="#000" />
              </Cylinder>
              <Torus ref={fan2Ref} args={[0.35, 0.03, 16, 32]} position={[0, 0, 0.06]}>
                <meshBasicMaterial color="#8b5cf6" />
              </Torus>
            </group>
          </group>
        </group>

        {/* --- KEYBOARD --- */}
        <group position={[-0.5, 0.08, 1.2]}>
          <Box args={[2.2, 0.05, 0.8]} castShadow receiveShadow>
            <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
          </Box>
          <Box args={[2.1, 0.02, 0.7]} position={[0, -0.02, 0]}>
             <meshBasicMaterial color="#3b82f6" />
          </Box>
          <Box args={[2, 0.02, 0.6]} position={[0, 0.03, 0]}>
            <meshBasicMaterial color="#d946ef" />
          </Box>
        </group>

        {/* --- MOUSEPAD & MOUSE --- */}
        <group position={[1.5, 0.06, 1.2]}>
          <Box args={[1.4, 0.01, 1.2]} receiveShadow>
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </Box>
          <Box args={[1.42, 0.005, 1.22]} position={[0, -0.005, 0]}>
            <meshBasicMaterial color="#06b6d4" />
          </Box>
          <Box args={[0.2, 0.1, 0.35]} position={[0, 0.05, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#050505" roughness={0.4} />
          </Box>
          <Box args={[0.05, 0.02, 0.1]} position={[0, 0.1, -0.05]}>
             <meshBasicMaterial color="#f43f5e" />
          </Box>
        </group>

      </group>
    </Float>
  );
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
      <Canvas 
        shadows 
        // Initial camera position. ResponsiveCamera will smoothly adjust this on load.
        camera={{ position: [0, 2, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ResponsiveCamera />
          
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight position={[-5, 5, 5]} intensity={2} color="#3b82f6" penumbra={1} />
          
          <GamingDeskSetup />
          
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.8} 
            scale={25} 
            blur={3} 
            far={5.5} 
            color="#000000"
          />
          <Environment preset="night" />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            <ChromaticAberration offset={[0.0005, 0.0005]} blendFunction={BlendFunction.NORMAL} />
          </EffectComposer>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={false} 
            maxPolarAngle={Math.PI / 2 - 0.1}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
