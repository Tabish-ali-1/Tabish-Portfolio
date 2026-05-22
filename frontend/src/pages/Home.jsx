import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Layout, ArrowUp } from 'lucide-react';
import About from './About';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';

const Home = () => {
  const [projectFilter, setProjectFilter] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full bg-background text-text-main">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left mt-10 lg:mt-0"
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              Available for new opportunities
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Tabish</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed">
              A Full-Stack Developer specializing in building exceptional digital experiences using the MERN stack.
            </motion.p>
          </motion.div>

          {/* Right Column: Image Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer Glowing Background Orbs */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Main Container */}
              <div className="relative w-full h-full bg-surface border border-border-custom rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Full-bleed Profile Image */}
                <img
                  src="/Tabish.jpeg"
                  alt="Tabish Ali"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="scroll-mt-20 border-t border-slate-800/40">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border-custom/40 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">What I Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Frontend */}
            <div
              onClick={() => {
                setProjectFilter('frontend');
                scrollToSection('projects');
              }}
              className="bg-surface p-8 rounded-2xl border border-border-custom hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Frontend Development</h3>
              <p className="text-text-muted">
                Building responsive, accessible, and performant user interfaces using React, Next.js, and Tailwind CSS.
              </p>
            </div>

            {/* Backend */}
            <div
              onClick={() => {
                setProjectFilter('backend');
                scrollToSection('projects');
              }}
              className="bg-surface p-8 rounded-2xl border border-border-custom hover:border-secondary/50 transition-colors group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Backend Development</h3>
              <p className="text-text-muted">
                Creating robust APIs and server-side logic using Node.js, Express, and implementing secure authentication.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20 border-t border-border-custom/40">
        <Projects filter={projectFilter} setFilter={setProjectFilter} />
      </section>

      {/* Resume Section */}
      <section id="resume" className="scroll-mt-20 border-t border-border-custom/40">
        <Resume />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 border-t border-border-custom/40 pb-20">
        <Contact />
      </section>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-surface/85 backdrop-blur-md border border-border-custom text-text-muted hover:text-text-main hover:bg-background transition-all shadow-lg hover:shadow-primary/20 cursor-pointer animate-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
