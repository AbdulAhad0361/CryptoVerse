import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import MarketOverview from '@/components/MarketOverview';
import ThreeJSFeature from '@/components/ThreeJSFeature';
import TopCryptoSection from '@/components/TopCryptoSection';
import MarketTrendsSection from '@/components/MarketTrendsSection';
import FooterSection from '@/components/FooterSection';
import Background from '@/components/ThreeJS/Background';

export default function Home() {
  // Scroll animation
  useEffect(() => {
    const scrollElements = document.querySelectorAll('.scroll-fade');
    
    function checkScrollElements() {
      scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    }
    
    // Initial check for elements in view
    checkScrollElements();
    
    // Listen for scroll
    window.addEventListener('scroll', checkScrollElements);
    
    return () => {
      window.removeEventListener('scroll', checkScrollElements);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Three.js Background Canvas */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-30">
        <Background />
      </div>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MarketOverview />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ThreeJSFeature />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <TopCryptoSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <MarketTrendsSection />
        </motion.div>
      </main>
      
      <FooterSection />
    </div>
  );
}
