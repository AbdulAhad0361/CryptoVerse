import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/ThreeJSFeature.module.css';
import CoinModel from './ThreeJS/CoinModel';

export default function ThreeJSFeature() {
  return (
    <section className="crypto-glow relative bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-4 sm:p-6 md:p-8 mb-12 overflow-hidden fade-in">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 md:pr-8">
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experience Crypto in 3D
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover the future of digital assets with our interactive 3D visualization technology. Rotate, zoom, and explore cryptocurrency models in real-time.
          </motion.p>
          <motion.button 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
        <motion.div 
          className="w-full md:w-1/2 mt-6 md:mt-0 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="canvas-container w-full h-full border-2 sm:border-4 border-white/30 dark:border-gray-700/30 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden">
            <CoinModel />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 dark:bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 sm:w-80 h-64 sm:h-80 bg-secondary/10 dark:bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
