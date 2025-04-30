import { useState } from 'react';
import { FaChartLine, FaBars, FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { useThemeMode } from '@/hooks/use-theme';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeMode();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 mr-2 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <FaChartLine className="text-white text-xl" />
              </div>
              <span className={styles.logoText}>CryptoVerse</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button 
                onClick={() => scrollToSection('overview')} 
                className="border-primary text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Dashboard
              </button>
              <button 
                onClick={() => scrollToSection('markets')} 
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Markets
              </button>
              <button 
                onClick={() => scrollToSection('cryptos')} 
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Cryptocurrencies
              </button>
              <button 
                onClick={() => scrollToSection('trends')} 
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Trends
              </button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button 
              onClick={toggleTheme}
              className="switch-theme p-2 rounded-full text-gray-600 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>
            <div className="ml-3 relative">
              <button className="bg-primary-100 dark:bg-primary-900 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary p-1">
                <span className="sr-only">Open user menu</span>
                <FaUser className="text-primary dark:text-primary-400 p-1" />
              </button>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <button 
            onClick={() => scrollToSection('overview')} 
            className="bg-primary-50 dark:bg-primary-900 border-primary text-primary-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
          >
            Dashboard
          </button>
          <button 
            onClick={() => scrollToSection('markets')} 
            className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
          >
            Markets
          </button>
          <button 
            onClick={() => scrollToSection('cryptos')} 
            className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
          >
            Cryptocurrencies
          </button>
          <button 
            onClick={() => scrollToSection('trends')} 
            className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
          >
            Trends
          </button>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <FaUser className="text-primary dark:text-primary-400" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 dark:text-white">User Account</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">user@example.com</div>
            </div>
            <button 
              onClick={toggleTheme}
              className="ml-auto switch-theme p-2 rounded-full text-gray-600 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
