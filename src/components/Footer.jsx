import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#home" className="text-2xl font-bold tracking-tighter text-white">
            Shravan Kumar U
          </a>
          <p className="text-text-muted text-sm text-center md:text-left">
            Building digital experiences with passion and precision.
          </p>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4">
            <a href="https://github.com/Shravan-Kumar-U" target='_blank' className="text-text-muted hover:text-white hover:-translate-y-1 transition-all">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shravan-kumar-u/z" target='_blank' className="text-text-muted hover:text-white hover:-translate-y-1 transition-all">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.instagram.com/pseudo._404_?mdxt=MXVtaTB2MWMyb2JiZA==" target='_blank' className="text-text-muted hover:text-white hover:-translate-y-1 transition-all">
              <FaInstagram size={20} />
            </a>
          </div>
          <p className="text-text-muted text-sm">
            © {currentYear} Shravan Kumar U. Crafted with React & Three.js.
          </p>
        </div>

      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none" />
      
    </footer>
  );
}
