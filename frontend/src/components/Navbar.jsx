import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Update scrolled state for styling threshold
      setScrolled(scrollTop > 50);

      // Scroll direction tracking for hide/show behavior
      if (isNavigating || isMenuOpen) {
        setLastScrollY(scrollTop);
        return;
      }

      if (scrollTop <= 50) {
        setVisible(true);
      } else if (scrollTop > lastScrollY) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }

      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize state on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavigating, isMenuOpen]);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['about', 'projects', 'resume', 'contact'];
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop < 150) {
        setActiveSection('home');
        return;
      }

      const scrollPosition = scrollTop + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Resume', id: 'resume' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setIsNavigating(true);
    setVisible(true); // Keep navbar visible when clicking a navigation link

    const finishNavigation = () => {
      // Small timeout to allow the smooth scrolling behavior to complete
      setTimeout(() => {
        setIsNavigating(false);
      }, 800);
    };

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      finishNavigation();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
        finishNavigation();
      } else {
        setIsNavigating(false);
      }
    }
  };

  const navbarVariants = {
    hidden: {
      y: -120,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 26,
      }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }
    }
  };

  const navStyles = scrolled
    ? 'bg-surface/90 border-border-custom/80 shadow-xl py-3 md:py-4 px-6 md:px-10'
    : 'bg-surface/60 border-border-custom/30 shadow-md py-4 md:py-6 px-6 md:px-10';

  return (
    <motion.nav
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={navbarVariants}
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-4 md:px-0 pointer-events-none"
    >
      <div className={`flex flex-col md:flex-row md:items-center rounded-[24px] md:rounded-full border backdrop-blur-md transition-all duration-300 pointer-events-auto w-[calc(100%-2rem)] mx-4 md:w-auto md:mx-0 ${navStyles}`}>
        {/* Mobile Header Row */}
        <div className="flex items-center justify-between w-full md:hidden">
          <span className="text-lg font-bold tracking-tighter text-primary">
            Tabish<span className="text-text-main">.</span>
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-muted hover:text-primary transition-all cursor-pointer bg-transparent border-none outline-none flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-text-muted hover:text-primary transition-all cursor-pointer bg-transparent border-none outline-none flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-lg font-medium transition-all hover:text-primary cursor-pointer bg-transparent border-none outline-none px-5 py-2 rounded-full ${
                activeSection === link.id ? 'text-primary font-bold bg-primary/10' : 'text-text-muted hover:text-text-main'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="h-8 w-px bg-border-custom/60"></div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-muted hover:text-primary transition-all cursor-pointer bg-transparent border-none outline-none flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full overflow-hidden md:hidden flex flex-col items-center space-y-2 pt-4 pb-2 border-t border-border-custom/40 mt-3"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-center text-base font-semibold py-2.5 rounded-xl transition-all cursor-pointer bg-transparent border-none outline-none ${
                    activeSection === link.id ? 'text-primary font-bold bg-primary/10' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
