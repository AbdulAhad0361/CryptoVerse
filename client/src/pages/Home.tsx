import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import MarketOverview from '@/components/MarketOverview';
import ThreeJSFeature from '@/components/ThreeJSFeature';
import TopCryptoSection from '@/components/TopCryptoSection';
import MarketTrendsSection from '@/components/MarketTrendsSection';
import FooterSection from '@/components/FooterSection';
import Background from '@/components/ThreeJS/Background';
import HeroSection from '@/components/HeroSection';
import StatisticsBar from '@/components/StatisticsBar';
import LiveNotifications from '@/components/LiveNotifications';
import CtaSection from '@/components/CtaSection';

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
      
      {/* Live price statistics bar */}
      <StatisticsBar />
      
      {/* Live notification component */}
      <LiveNotifications />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section id="hero">
          <HeroSection />
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section id="overview" className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="scroll-fade"
            >
              <MarketOverview />
            </motion.div>
          </section>
          
          <section id="markets" className="pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="scroll-fade"
            >
              <ThreeJSFeature />
            </motion.div>
          </section>
          
          <section id="cryptos" className="pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="scroll-fade"
            >
              <TopCryptoSection />
            </motion.div>
          </section>
          
          <section id="trends" className="pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="scroll-fade"
            >
              <MarketTrendsSection />
            </motion.div>
          </section>
        </div>
        
        {/* CTA Section */}
        <section id="cta">
          <CtaSection />
        </section>
      </main>
      
      <FooterSection />
    </div>
  );
}
