import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ModelViewer from './3d/ModelViewer';
import { HERO_DATA } from '../data/constants';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    // min-h-screen allows the section to grow vertically. This prevents the text and the model from ever overlapping.
    <section id="home" ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-start pt-32 pb-4">
      
      {/* Glow effects specific to Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
         <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent-blue/10 blur-[150px] rounded-full" />
         <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-accent-violet/10 blur-[150px] rounded-full" />
      </div>

      {/* Row 1: The Text Content */}
      {/* Placed naturally in the document flow so it pushes the 3D model down */}
      <div className="w-full max-w-7xl mx-auto px-6 z-20 mb-16 lg:mb-20">
        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-start text-left max-w-3xl"
        >
          {/* Removed flex, flex-wrap, and gap-x-4 */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-white"
        >
          {HERO_DATA.greeting} <span className="text-accent-violet">{HERO_DATA.name}</span>
        </motion.h1>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-3xl text-text-secondary font-medium"
          >
            {HERO_DATA.title}
          </motion.h2>
        </motion.div>
      </div>

      {/* Row 2: The 3D Model */}
      {/* Given a massive explicit height so it doesn't get clipped at the bottom, and safely sits below the text */}
      {/* Add pointer-events-none for mobile, restore it on sm/desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto relative z-10 h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] pointer-events-none sm:pointer-events-auto"
      >
        <ModelViewer />
      </motion.div>
      
    </section>
  );
}
