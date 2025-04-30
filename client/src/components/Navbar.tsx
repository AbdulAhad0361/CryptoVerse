import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaBars, FaMoon, FaSun, FaSearch, FaBitcoin, FaInfoCircle, FaHeadset } from 'react-icons/fa';
import { useThemeMode } from '@/hooks/use-theme';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isDark, toggleTheme } = useThemeMode();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ['hero', 'overview', 'markets', 'cryptos', 'trends', 'cta'];
      let currentSection = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // If menu is open and click is outside the menu and not on the menu button
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // Close menu first to avoid any interference with scrolling
    setIsMenuOpen(false);
    
    // Add a small delay to let the menu close animation finish
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Get the section position and adjust for navbar height
        const yOffset = -80; // Adjust this value based on your navbar height
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        // Scroll to the section
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent dark:bg-transparent'
      } transition-all duration-300`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 mr-2 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-xl flex items-center justify-center shadow-lg overflow-hidden group">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <FaBitcoin className="text-white text-xl relative z-10" />
              </div>
              <div className="relative">
                <span className={`${styles.logoText} text-gray-900 dark:text-white text-xl font-bold tracking-tight`}>
                  CryptoVerse
                </span>
                <span className="absolute -top-1 -right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  PRO
                </span>
              </div>
            </motion.div>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'overview', label: 'Dashboard' },
                { id: 'markets', label: 'Markets' },
                { id: 'cryptos', label: 'Cryptocurrencies' },
                { id: 'trends', label: 'Trends' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search button */}
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors duration-200">
              <FaSearch className="text-lg" />
            </button>
            
            {/* Info button */}
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors duration-200">
              <FaInfoCircle className="text-lg" />
            </button>
            
            {/* Contact button */}
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors duration-200">
              <FaHeadset className="text-lg" />
            </button>
            
            {/* Theme toggle */}
            <motion.button 
              onClick={toggleTheme}
              className="switch-theme p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <FaSun className="text-lg text-yellow-400" /> : <FaMoon className="text-lg text-blue-600" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
          
          <div className="flex items-center md:hidden">
            {/* Theme toggle on mobile */}
            <motion.button 
              onClick={toggleTheme}
              className="switch-theme p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none mr-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
            </motion.button>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'overview', label: 'Dashboard' },
                { id: 'markets', label: 'Markets' },
                { id: 'cryptos', label: 'Cryptocurrencies' },
                { id: 'trends', label: 'Trends' }
              ].map((item) => (
                <motion.button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="grid grid-cols-3 gap-2 pt-2 mt-4 border-t border-gray-100 dark:border-gray-800">
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <FaSearch className="text-lg mb-1" />
                  <span className="text-xs">Search</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <FaInfoCircle className="text-lg mb-1" />
                  <span className="text-xs">Info</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <FaHeadset className="text-lg mb-1" />
                  <span className="text-xs">Support</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
