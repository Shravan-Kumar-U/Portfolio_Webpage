import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Button from './ui/Button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navLinks.map(link => link.name.toLowerCase());
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stagger animation variants for mobile menu links
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, filter: 'blur(6px)', transition: { duration: 0.25 } },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold tracking-tighter relative z-50">
            Shravan<span className="text-accent-blue"> </span>Kumar<span className="text-accent-blue"> </span>U
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-white relative ${activeSection === link.name.toLowerCase() ? 'text-white' : 'text-text-secondary'
                      }`}
                  >
                    {link.name}
                    {activeSection === link.name.toLowerCase() && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-blue rounded-full"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a href="https://github.com/Shravan-Kumar-U" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shravan-kumar-u/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="/ResumeOfMe.pdf" download="Shravan_Kumar_U_Resume.pdf"><Button size="sm" variant="outline">Resume</Button></a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block rounded-full origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-6 h-0.5 bg-white block rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block rounded-full origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
            style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
          />
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay — premium full-screen design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Backdrop with gradient */}
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-xl" />

            {/* Decorative background elements */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
              {/* Nav links with stagger animation */}
              <motion.ul
                className="flex flex-col items-center gap-6 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map((link, idx) => (
                  <motion.li key={link.name} variants={linkVariants}>
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-bold tracking-tight transition-all duration-300 block text-center ${
                        activeSection === link.name.toLowerCase()
                          ? 'text-white'
                          : 'text-text-muted hover:text-white'
                      }`}
                    >
                      <span className={`${activeSection === link.name.toLowerCase() ? 'text-gradient-accent' : ''}`}>
                        {link.name}
                      </span>
                      {activeSection === link.name.toLowerCase() && (
                        <motion.div
                          layoutId="activeSectionMobile"
                          className="h-0.5 w-12 mx-auto mt-2 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan rounded-full"
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
              />

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-6 mb-8"
              >
                <a href="https://github.com/Shravan-Kumar-U" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all">
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/shravan-kumar-u/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all">
                  <FaLinkedin size={22} />
                </a>
              </motion.div>

              {/* Resume button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
              <a href="/ResumeOfMe.pdf" download="Shravan_Kumar_U_Resume.pdf">
                <Button variant="outline" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Download Resume
                </Button>
              </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
