import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-primary">
      {/* Added dpr limiter and high-performance flag */}
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#030303']} />
        
        {/* Reduced count and complexity for better mobile performance */}
        <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
        
        {/* Hide Sparkles on mobile using a simple CSS trick, or rely on the dpr reduction */}
        <group>
          <Sparkles count={50} scale={20} size={2} speed={0.4} opacity={0.3} color="#3b82f6" />
          <Sparkles count={30} scale={20} size={3} speed={0.2} opacity={0.3} color="#8b5cf6" />
        </group>
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#3b82f6" intensity={1} distance={50} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={1} distance={50} />
      </Canvas>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip text-text-primary selection:bg-accent-blue selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      
      {/* Global Polished 3D Starfield Background */}
      <GlobalBackground />
      
      {!isLoading && (
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          
          {/* Global Back to Top Button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass-card border border-white/20 hidden md:flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all shadow-lg z-50 cursor-pointer"
            aria-label="Back to Top"
          >
            ↑
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
