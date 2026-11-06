import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 400); // Wait a bit at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-white"
    >
      <div className="flex flex-col items-center gap-8 w-64">
        {/* Animated Logo/Spinner */}
        <div className="relative w-24 h-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-l-2 border-accent-blue"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-r-2 border-accent-violet"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-t-2 border-accent-cyan"
          />
        </div>

        {/* Text and Progress */}
        <div className="w-full text-center">
          <div className="font-mono text-sm tracking-widest text-text-secondary mb-4 uppercase">
            Initializing Experience...
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
              style={{ width: `${progress}%` }}
              layoutId="progressBar"
            />
          </div>
          <div className="font-mono text-xs mt-2 text-text-muted text-right">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
