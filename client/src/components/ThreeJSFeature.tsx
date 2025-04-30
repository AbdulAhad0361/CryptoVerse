import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaInfoCircle, FaTimes } from 'react-icons/fa';
import styles from '@/styles/ThreeJSFeature.module.css';
import ModelSelector from './ThreeJS/ModelSelector';

// Crypto information lookup
const cryptoInfo = {
  bitcoin: {
    title: "Bitcoin (BTC)",
    description: "The world's first cryptocurrency, created by an anonymous person or group known as Satoshi Nakamoto in 2009.",
    features: [
      "Decentralized digital currency",
      "Limited supply of 21 million coins",
      "Uses proof-of-work consensus"
    ]
  },
  ethereum: {
    title: "Ethereum (ETH)",
    description: "A decentralized, open-source blockchain with smart contract functionality, founded by Vitalik Buterin in 2015.",
    features: [
      "Smart contract platform",
      "Supports decentralized applications (dApps)",
      "Transitioned to proof-of-stake in 2022"
    ]
  },
  solana: {
    title: "Solana (SOL)",
    description: "A high-performance blockchain supporting smart contracts and decentralized applications with low transaction fees.",
    features: [
      "High throughput (65,000+ TPS)",
      "Uses proof-of-history consensus",
      "Fast transaction finality"
    ]
  },
  ripple: {
    title: "Ripple (XRP)",
    description: "A digital payment protocol and cryptocurrency designed for fast, low-cost international money transfers.",
    features: [
      "Designed for financial institutions",
      "3-5 second transaction settlement",
      "Low energy consumption"
    ]
  },
  cardano: {
    title: "Cardano (ADA)",
    description: "A proof-of-stake blockchain platform founded by Ethereum co-founder Charles Hoskinson, focusing on sustainability and scalability.",
    features: [
      "Research-driven approach",
      "Multi-layer architecture",
      "Focus on formal verification"
    ]
  },
  polkadot: {
    title: "Polkadot (DOT)",
    description: "A multi-chain network enabling different blockchains to transfer messages and value in a trust-free fashion, founded by Ethereum co-founder Dr. Gavin Wood.",
    features: [
      "Connects multiple specialized blockchains",
      "Cross-chain interoperability",
      "Shared security model"
    ]
  }
};

export default function ThreeJSFeature() {
  const [activeModel, setActiveModel] = useState('bitcoin');
  const [showInfo, setShowInfo] = useState(false);
  
  // Update active model when ModelSelector changes models
  const handleModelChange = (modelName: string) => {
    setActiveModel(modelName);
  };
  
  // Toggle info display (for touch devices)
  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };
  
  // Get current crypto info
  const currentInfo = cryptoInfo[activeModel as keyof typeof cryptoInfo] || cryptoInfo.bitcoin;
  
  return (
    <section id="3d-models" className="crypto-glow relative bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-4 sm:p-6 md:p-8 mb-12 overflow-hidden fade-in">
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
            Discover the future of digital assets with our interactive 3D visualization technology. Explore detailed models of popular cryptocurrencies and learn about their key features.
          </motion.p>
          
          {/* Features list */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center mb-3">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-2">
                <FaInfoCircle className="text-white text-xs" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Interactive Features</h3>
            </div>
            
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-8">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm sm:text-base">Interactive 3D models for 6 major cryptocurrencies</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm sm:text-base">Dynamic particle effects and animations</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                <span className="text-sm sm:text-base">Detailed information about each cryptocurrency</span>
              </li>
            </ul>
          </motion.div>
          
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
        
        {/* 3D model container */}
        <motion.div 
          className="w-full md:w-1/2 mt-6 md:mt-0 h-64 xs:h-72 sm:h-80 md:h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div 
            className="canvas-container w-full h-full border-2 sm:border-4 border-white/30 dark:border-gray-700/30 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden relative"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <ModelSelector onModelChange={handleModelChange} />
            
            {/* Info toggle button - clickable for touch devices and visible when info is hidden */}
            {!showInfo && (
              <button 
                onClick={toggleInfo}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-3 shadow-lg animate-pulse hover:scale-110 transition-transform cursor-pointer"
                aria-label="Show cryptocurrency information"
              >
                <FaInfoCircle className="text-xl text-primary" />
              </button>
            )}
            
            {/* Info card with hover functionality */}
            <div 
              className={`absolute left-4 right-4 bottom-20 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-3 text-left transition-all duration-300 ${
                showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              {/* Close button for touch devices */}
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close information panel"
              >
                <FaTimes className="text-xs text-gray-500 dark:text-gray-400" />
              </button>
              
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1 pr-6">{currentInfo.title}</h4>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">{currentInfo.description}</p>
              <div className="flex flex-wrap gap-1">
                {currentInfo.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary-800 dark:text-primary-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 dark:bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 sm:w-80 h-64 sm:h-80 bg-secondary/10 dark:bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
