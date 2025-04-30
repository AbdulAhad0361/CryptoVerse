import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaHandHoldingUsd, FaGlobeAmericas } from 'react-icons/fa';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [count, setCount] = useState({
    users: 0,
    volume: 0,
    countries: 0
  });

  // Animate the count up effect
  useEffect(() => {
    const userTarget = 2.7;
    const volumeTarget = 87.5;
    const countriesTarget = 195;
    
    const duration = 2000; // 2 seconds
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      
      setCount({
        users: Number((userTarget * progress).toFixed(1)),
        volume: Math.floor(volumeTarget * progress),
        countries: Math.floor(countriesTarget * progress)
      });
      
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, []);

  // Tab content data
  const tabContent = [
    {
      title: "Trade with Confidence",
      description: "Access real-time market data, advanced charting tools, and insights to make informed trading decisions across top cryptocurrencies."
    },
    {
      title: "Secure Portfolio Management",
      description: "Track your investments with precision, set price alerts, and manage your digital assets with enterprise-grade security protocols."
    },
    {
      title: "Learn as You Invest",
      description: "Access educational resources, market analyses, and trend predictions to help you navigate the crypto market like a pro."
    }
  ];

  return (
    <div className="relative overflow-hidden pt-8">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-50 to-white dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 opacity-80 -z-10"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC05aDR2MWgtNHYtMXptMCAyaDR2MWgtNHYtMXptMCAzaDR2MWgtNHYtMXptMCAzaDR2MWgtNHYtMXptMCAzaDR2MWgtNHYtMXoiLz48cGF0aCBkPSJNMCAwaDYwdjYwSDB6TTMwIDYwaDMwVjMwSDMweiIvPjwvZz48L2c+PC9zdmc+')] bg-center opacity-10 dark:opacity-20 -z-10"></div>
      
      {/* Animated blurred shapes with increased size and vibrancy */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-30 animate-blob -z-10"></div>
      <div className="absolute -top-10 right-0 w-96 h-96 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-30 animate-blob animation-delay-2000 -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-30 animate-blob animation-delay-4000 -z-10"></div>
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-3000 -z-10"></div>
      
      {/* Particle dots pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 -z-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 1px, transparent 1px), radial-gradient(circle, rgba(99, 102, 241, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 20px 20px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>
      
      {/* Floating animated shapes */}
      <div className="absolute top-20 right-20 w-12 h-12 bg-blue-500 dark:bg-blue-400 rounded opacity-20 dark:opacity-30 -z-10"
           style={{ animation: 'float 10s ease-in-out infinite' }}></div>
      <div className="absolute bottom-40 left-20 w-10 h-10 bg-purple-500 dark:bg-purple-400 rounded-full opacity-20 dark:opacity-30 -z-10"
           style={{ animation: 'float 12s ease-in-out infinite reverse' }}></div>
      <div className="absolute top-60 left-1/4 w-8 h-8 border-2 border-indigo-400 dark:border-indigo-300 opacity-30 dark:opacity-40 -z-10"
           style={{ animation: 'float 15s ease-in-out infinite' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - text content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
                Live Market Data
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                Secure Trading
              </span>
            </div>
          
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white relative">
                <span className="block">Explore the World of</span>
                <div className="relative inline-block">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                    Crypto Trading
                  </span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-[6px] rounded-full bg-gradient-to-r from-blue-600/30 via-purple-500/30 to-indigo-600/30 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-indigo-400/30"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </div>
              </h1>
            </motion.div>
          
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative z-10">Your gateway to the cryptocurrency universe. Track real-time prices, visualize market trends, and stay ahead with powerful analytics.</span>
              <motion.span 
                className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-blue-100/20 to-transparent dark:from-blue-900/10 dark:to-transparent -z-10 rounded-md"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.p>
          
            {/* Feature tabs */}
            <div className="space-y-4 pt-4">
              <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
                {tabContent.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      activeTab === index
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Feature {index + 1}
                  </button>
                ))}
              </div>
              <div className="py-4">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tabContent[activeTab].description}
                  </p>
                </motion.div>
              </div>
            </div>
          
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <motion.button
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Markets
                <FaArrowRight className="ml-2" />
              </motion.button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition hover:shadow">
                View Documentation
              </button>
            </div>
          </div>
          
          {/* Right column - statistics */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Background pattern for card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 -z-10"></div>
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-200/20 dark:bg-blue-700/10 rounded-full blur-xl -z-10"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-200/20 dark:bg-purple-700/10 rounded-full blur-xl -z-10"></div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Global Statistics</h3>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  Live Data
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                      <FaHandHoldingUsd className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{count.users}M+</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg">
                      <FaChartLine className="text-purple-600 dark:text-purple-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${count.volume}B+</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                      <FaGlobeAmericas className="text-green-600 dark:text-green-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Countries</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{count.countries}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Features list */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-500 dark:bg-green-400 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Real-time market data
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Access price updates, market caps, and trading volumes as they happen.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-500 dark:bg-green-400 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Interactive 3D visualizations
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Explore cryptocurrencies with our immersive 3D model gallery.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-500 dark:bg-green-400 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Advanced trend analysis
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Track historical data and predict future movements with AI-powered insights.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}