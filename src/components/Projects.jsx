import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SectionTitle from './ui/SectionTitle';
import { PROJECTS_DATA } from '../data/constants';

function ProjectCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center mb-24 last:mb-0`}
    >
      {/* Project Image with 3D Tilt */}
      <motion.div
        className="w-full lg:w-3/5 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden glass-card group cursor-pointer">
          <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end p-8">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 flex gap-4">
              <a href={project.liveDemo} target='_blank' className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform">
                <FaExternalLinkAlt size={18} />
              </a>
              <a href={project.github} target='_blank' className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaGithub size={22} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Info */}
      <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} items-start text-left`}>
        <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-4">
          Featured Project
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 hover:text-accent-blue transition-colors cursor-pointer">
          {project.title}
        </h3>

        <div className="glass-card p-6 md:p-8 mb-6 relative z-30 lg:-ml-12 lg:mr-0 group-even:lg:-mr-12 group-even:lg:ml-0">
          <p className="text-text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>

        <ul className={`flex flex-wrap gap-4 mb-8 ${isEven ? 'justify-start' : 'lg:justify-end justify-start'} font-mono text-sm text-text-muted`}>
          {project.technologies.map(tech => (
            <li key={tech} className="hover:text-accent-violet transition-colors">{tech}</li>
          ))}
        </ul>

        <div className="flex items-center gap-4 lg:hidden">
          <a href={project.github} target='_blank' className="text-text-secondary hover:text-white transition-colors">
            <FaGithub size={24} />
          </a>
          <a href={project.liveDemo} className="text-text-secondary hover:text-white transition-colors">
            <FaExternalLinkAlt size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 ">
        <SectionTitle title="Some Things I've Built" subtitle="Portfolio" align="center" />

        <div className="mt-16 flex flex-col">
          {PROJECTS_DATA.filter(p => p.featured).map((project, index) => (
            <div key={project.id} className="group">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
