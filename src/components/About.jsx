import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';
import { ABOUT_DATA } from '../data/constants';

export default function About() {
  return (
    <section id="about" className="pt-12 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title={ABOUT_DATA.title} subtitle="Get to know me" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image / Avatar / 3D Abstract Representation */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square rounded-2xl glass-card overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-accent-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="https://res.cloudinary.com/dopaqdvhd/image/upload/v1793973757/95b20130-3be4-467d-8ec9-7bd6e540ce09.png" 
                alt="Developer Profile" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Subtle decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-cyan/30 blur-2xl rounded-full" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent-blue/30 blur-2xl rounded-full" />
            </div>
          </motion.div>

          {/* Text & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Engineering with purpose and passion.
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              {ABOUT_DATA.introduction}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {ABOUT_DATA.stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="glass-card p-6 flex flex-col items-center md:items-start text-center md:text-left hover:-translate-y-1 transition-transform"
                >
                  <span className="text-3xl md:text-4xl font-bold text-gradient-accent mb-2">
                    {stat.value}
                  </span>
                  <span className="text-sm text-text-muted uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
