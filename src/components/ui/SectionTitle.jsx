import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, align = 'center', className = '' }) {
  const alignments = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  return (
    <div className={`flex flex-col ${alignments[align]} mb-16 ${className}`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-4"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`h-1 w-24 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan mt-6 rounded-full origin-${align}`}
      />
    </div>
  );
}
