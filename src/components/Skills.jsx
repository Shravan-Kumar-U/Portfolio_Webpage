import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import SectionTitle from './ui/SectionTitle';
import { SKILLS_DATA } from '../data/constants';

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
  // Split skills into two rows. No duplication needed here anymore.
  const half = Math.ceil(SKILLS_DATA.length / 2);
  const row1 = SKILLS_DATA.slice(0, half);
  const row2 = SKILLS_DATA.slice(half);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* 3D Background - Optimized for mobile scrolling */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none flex justify-center items-center">
        <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance" }}>
          <ambientLight intensity={0.5} />
          <ParticleSphere />
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
        <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {/* Block 1 */}
            <div className="flex gap-8 pr-8">
              {row1.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={`r1a-${skill.name}-${index}`} className="flex items-center gap-4 glass-card px-8 py-4 w-[250px] group hover:bg-white/10 transition-colors cursor-pointer border-white/10 backdrop-blur-md bg-[#171717]/60">
                    <Icon size={32} className="text-text-secondary group-hover:text-accent-blue transition-colors" />
                    <span className="text-lg font-medium text-white whitespace-nowrap">{skill.name}</span>
                  </div>
                );
              })}
            </div>
            {/* Block 2 (Exact Duplicate for Seamless Loop) */}
            <div className="flex gap-8 pr-8">
              {row1.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={`r1b-${skill.name}-${index}`} className="flex items-center gap-4 glass-card px-8 py-4 w-[250px] group hover:bg-white/10 transition-colors cursor-pointer border-white/10 backdrop-blur-md bg-[#171717]/60">
                    <Icon size={32} className="text-text-secondary group-hover:text-accent-blue transition-colors" />
                    <span className="text-lg font-medium text-white whitespace-nowrap">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div 
            className="flex w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {/* Block 1 */}
            <div className="flex gap-8 pr-8">
              {row2.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={`r2a-${skill.name}-${index}`} className="flex items-center gap-4 glass-card px-8 py-4 w-[250px] group hover:bg-white/10 transition-colors cursor-pointer border-white/10 backdrop-blur-md bg-[#171717]/60">
                    <Icon size={32} className="text-text-secondary group-hover:text-accent-violet transition-colors" />
                    <span className="text-lg font-medium text-white whitespace-nowrap">{skill.name}</span>
                  </div>
                );
              })}
            </div>
            {/* Block 2 */}
            <div className="flex gap-8 pr-8">
              {row2.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={`r2b-${skill.name}-${index}`} className="flex items-center gap-4 glass-card px-8 py-4 w-[250px] group hover:bg-white/10 transition-colors cursor-pointer border-white/10 backdrop-blur-md bg-[#171717]/60">
                    <Icon size={32} className="text-text-secondary group-hover:text-accent-violet transition-colors" />
                    <span className="text-lg font-medium text-white whitespace-nowrap">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}