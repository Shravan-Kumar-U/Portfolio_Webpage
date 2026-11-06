import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaEnvelope, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';

// ─── EmailJS Configuration (loaded from .env) ──────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ────────────────────────────────────────────────────────────────────────

// ─── Floating-label input component ────────────────────────────────────
function FloatingInput({ id, name, type = 'text', icon: Icon, label, required = true }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  return (
    <div className="relative group">
      {/* Animated gradient border glow on focus */}
      <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 blur-[2px] transition-opacity duration-500 ${focused ? 'opacity-60' : 'group-hover:opacity-30'}`} />

      <div className="relative flex items-center">
        {/* Icon */}
        <span className={`absolute left-4 transition-colors duration-300 z-10 ${focused ? 'text-accent-blue' : 'text-text-muted'}`}>
          <Icon size={14} />
        </span>

        <input
          type={type}
          id={id}
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
          className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 pt-5 pb-2 text-white text-sm focus:outline-none focus:border-accent-blue/50 transition-all duration-300 placeholder-transparent"
          placeholder={label}
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`absolute left-10 transition-all duration-300 pointer-events-none ${
            isActive
              ? 'top-1.5 text-[10px] font-semibold tracking-wider uppercase text-accent-cyan'
              : 'top-1/2 -translate-y-1/2 text-sm text-text-muted'
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

// ─── Floating-label textarea component ─────────────────────────────────
function FloatingTextarea({ id, name, label, rows = 5, required = true }) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  return (
    <div className="relative group">
      {/* Animated gradient border glow on focus */}
      <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 blur-[2px] transition-opacity duration-500 ${focused ? 'opacity-60' : 'group-hover:opacity-30'}`} />

      <div className="relative">
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
          className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-7 pb-3 text-white text-sm focus:outline-none focus:border-accent-blue/50 transition-all duration-300 resize-none placeholder-transparent"
          placeholder={label}
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            isActive
              ? 'top-2 text-[10px] font-semibold tracking-wider uppercase text-accent-cyan'
              : 'top-4 text-sm text-text-muted'
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('loading');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setFormState('success');
      formRef.current.reset();
      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-2xl mx-auto px-6">
        <SectionTitle title="Let's Build Something Amazing Together." subtitle="What's Next?" align="center" />

        {/* ────────── Centered Form ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="mt-12 glass-card p-8 md:p-10 relative overflow-hidden"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-accent-blue/15 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent-violet/15 to-transparent rounded-tl-full pointer-events-none" />

          {/* Subtle moving gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none animate-pulse" />

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            {/* Form header */}
            <div className="mb-2 text-center">
              <h4 className="text-lg font-semibold text-white">Send me a message</h4>
              <p className="text-text-muted text-xs mt-1">All fields marked are required</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput id="name" name="from_name" icon={FaUser} label="Your Name" />
              <FloatingInput id="email" name="from_email" type="email" icon={FaEnvelope} label="Email Address" />
            </div>

            <FloatingInput id="subject" name="subject" icon={FaMapMarkerAlt} label="Location" />

            <FloatingTextarea id="message" name="message" label="Your Message" rows={6} />

            {/* Submit button with state feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <AnimatePresence mode="wait">
                {formState === 'success' && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-emerald-400 text-sm flex items-center gap-2"
                  >
                    <FaCheckCircle /> Message sent successfully!
                  </motion.p>
                )}
                {formState === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-red-400 text-sm flex items-center gap-2"
                  >
                    <FaExclamationCircle /> Something went wrong. Try again.
                  </motion.p>
                )}
                {(formState === 'idle' || formState === 'loading') && (
                  <motion.span key="empty" className="text-transparent text-sm hidden sm:block">.</motion.span>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                size="lg"
                className="min-w-[180px] w-full sm:w-auto group/btn"
                disabled={formState === 'loading'}
              >
                {formState === 'idle' && (
                  <>
                    Send Message
                    <FaPaperPlane className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </>
                )}
                {formState === 'loading' && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </div>
                )}
                {formState === 'success' && (
                  <>
                    Sent!
                    <FaCheckCircle className="ml-2 text-emerald-400" />
                  </>
                )}
                {formState === 'error' && (
                  <>
                    Retry
                    <FaExclamationCircle className="ml-2 text-red-400" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
