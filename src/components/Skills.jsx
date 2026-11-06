import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import SectionTitle from './ui/SectionTitle';
import { SKILLS_DATA } from '../data/constants';

// Restored interactive 3D background element
function ParticleSphere() {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.x -= delta * 0.1;
    mesh.current.rotation.y -= delta * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

export default function Skills() {
  // Split skills into two arrays for the two moving lines
  const half = Math.ceil(SKILLS_DATA.length / 2);
  const row1 = SKILLS_DATA.slice(0, half);
  const row2 = SKILLS_DATA.slice(half);

  // Duplicate arrays to create seamless loop
  const marquee1 = [...row1, ...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* Restored 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none flex justify-center items-center">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <ParticleSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-full h-[300px] bg-accent-blue/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <SectionTitle title="Technical Arsenal" subtitle="Skills & Tools" align="center" />
      </div>
        
      <div className="relative z-10 w-full flex flex-col gap-8 overflow-hidden">
        
        {/* Row 1 - Left to Right */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div 
            className="flex items-center justify-center md:justify-start gap-8 px-4"
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {marquee1.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={`${skill.name}-${index}`} className="flex items-center gap-4 glass-card px-8 py-4 min-w-[250px] group hover:bg-white/10 transition-colors cursor-pointer border-white/10 backdrop-blur-md bg-[#171717]/60">
                  <Icon size={32} className="text-text-secondary group-hover:text-accent-blue transition-colors" />
                  <span className="text-lg font-medium text-white whitespace-nowrap">{skill.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div 
            className="flex items-center justify-center md:justify-start gap-8 px-4"
            animate={{ x: [-1035, 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {marquee2.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={`${skill.name}-${index}`} className="flex items-center gap-4 glass-card px-8 py-4 min-w-[250px] group hover:bg-white/10 transition-colors cursor-pointer border-white/10 backdrop-blur-md bg-[#171717]/60">
                  <Icon size={32} className="text-text-secondary group-hover:text-accent-violet transition-colors" />
                  <span className="text-lg font-medium text-white whitespace-nowrap">{skill.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
