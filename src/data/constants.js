import React, { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaDocker, FaGithub, FaAws, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPostman, SiCloudinary } from 'react-icons/si';

const AnimatedTitle = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100); // Milliseconds per character

  const titles = [
    "Full Stack Developer & Creative Technologist",
    "Competitive Programmer"
  ];

  useEffect(() => {
    let timer;
    const currentTitle = titles[loopNum % titles.length];

    const handleTyping = () => {
      if (isDeleting) {
        // Backspacing
        setText(currentTitle.substring(0, text.length - 1));
        setTypingSpeed(50); // Delete slightly faster
      } else {
        // Typing
        setText(currentTitle.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      // Check if word is complete or fully deleted
      if (!isDeleting && text === currentTitle) {
        // Pause at the end before deleting
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Switch to the next word once fully deleted
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {}, 500); // Brief pause before typing next word
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Using React.createElement to return the text and a blinking cursor pipe (|)
  return React.createElement(
    'span', 
    null, 
    text,
    // Optional blinking cursor using inline styles (or you can use Tailwind class 'animate-pulse' if you have it set up)
    React.createElement('span', { style: { opacity: text === '' ? 0 : 1, animation: 'pulse 1s infinite' } }, '|')
  );
};

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: "Shravan Kumar U",
  title: React.createElement(AnimatedTitle, null),
  description: "I build scalable web applications and immersive digital experiences that combine technology, design, and creativity.",
};

export const ABOUT_DATA = {
  title: "About Me",
  introduction: "I am a passionate software developer focused on building modern, scalable, and user-friendly applications. With a strong foundation in both front-end and back-end development, I enjoy bridging the gap between design and engineering to create products that look good and perform flawlessly.",
  stats: [
    { label: "Projects Completed", value: "+20" },
    { label: "Technologies", value: "+10" },
    { label: "Passion for Dev", value: "100%" },
  ]
};

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Dev-Studio – 3D Printing Inventory Platform",
    description: "Designed a responsive React and Tailwind UI using TanStack Query for data caching and state synchronisation, with dynamic theme switching.",
    image: "https://res.cloudinary.com/dopaqdvhd/image/upload/v1793949695/Screenshot_2026-11-06_125005.png",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/Shravan-Kumar-U/dev-studio",
    liveDemo: "https://dev-studio-hb5q.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Brainly – Second Brain",
    description: "Created a personal knowledge management application that allows users to save, organize, and manage notes and links through complete CRUD functionality.",
    image: "https://res.cloudinary.com/dopaqdvhd/image/upload/v1793949938/Screenshot_2026-11-06_125504.png",
    technologies: ["React", "D3.js", "Express", "Redis"],
    github: "https://github.com/Shravan-Kumar-U/Brainly_Second_Brain",
    liveDemo: "https://brainly-second-brain-eosin.vercel.app/login",
    featured: true,
  },
  {
    id: 3,
    title: "Intelligent Adaptive Fleet-Level OTA Deployment Framework (FOTA)",
    description: "A centralized platform for managing over-the-air firmware updates for IoT devices globally. Includes real-time analytics and device monitoring.",
    image: "https://res.cloudinary.com/dopaqdvhd/image/upload/v1793949458/WhatsApp_Image_2026-10-09_at_10.18.16_PM.jpg",
    technologies: ["React", "Node.js", "AWS IoT", "MongoDB"],
    github: "#",
    liveDemo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "AI-Powered Assistant",
    description: "A sophisticated conversational agent leveraging LLMs to help developers write and debug code faster.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    technologies: ["React", "Python", "OpenAI API", "Docker"],
    github: "#",
    liveDemo: "#",
    featured: false,
  }
];

export const SKILLS_DATA = [
  { name: "React", icon: FaReact, category: "Frontend" },
  { name: "JavaScript", icon: FaJs, category: "Frontend" },
  { name: "HTML5", icon: FaHtml5, category: "Frontend" },
  { name: "CSS3", icon: FaCss3Alt, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend" },
  { name: "Express", icon: SiExpress, category: "Backend" },
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "MySQL", icon: SiMysql, category: "Database" },
  { name: "Git", icon: FaGithub, category: "Tools" },
  { name: "Docker", icon: FaDocker, category: "Tools" },
  { name: "AWS", icon: FaAws, category: "Cloud" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  email: "hello@example.com",
};