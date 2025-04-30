import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import CoinModel from './CoinModel';
import EthereumModel from './EthereumModel';
import SolanaModel from './SolanaModel';
import ParticleBackground from './ParticleBackground';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';

type CryptoModel = 'bitcoin' | 'ethereum' | 'solana';

export default function ModelSelector() {
  const [activeModel, setActiveModel] = useState<CryptoModel>('bitcoin');
  
  // Get the particle color based on the active model
  const getParticleColor = useCallback(() => {
    switch (activeModel) {
      case 'bitcoin':
        return '#F59E0B'; // Amber
      case 'ethereum':
        return '#3B82F6'; // Blue
      case 'solana':
        return '#9945FF'; // Purple
      default:
        return '#6366F1'; // Indigo
    }
  }, [activeModel]);
  
  // Render the appropriate model based on selection
  const renderModel = () => {
    switch (activeModel) {
      case 'bitcoin':
        return <CoinModel />;
      case 'ethereum':
        return <EthereumModel />;
      case 'solana':
        return <SolanaModel />;
      default:
        return <CoinModel />;
    }
  };
  
  return (
    <div className="w-full h-full">
      {/* Model display area */}
      <div className="w-full h-full relative">
        {/* Particle background that changes color with model */}
        <ParticleBackground 
          color={getParticleColor()} 
          particleCount={150}
          speed={0.002}
        />
        
        {/* Active 3D model */}
        {renderModel()}
        
        {/* Model name label */}
        <motion.div 
          className="absolute top-4 left-0 right-0 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={activeModel} // Re-animate when model changes
        >
          <span className="px-3 py-1 rounded-lg bg-white/30 dark:bg-black/30 backdrop-blur-sm text-gray-800 dark:text-white font-semibold text-sm">
            {activeModel === 'bitcoin' && 'Bitcoin (BTC)'}
            {activeModel === 'ethereum' && 'Ethereum (ETH)'}
            {activeModel === 'solana' && 'Solana (SOL)'}
          </span>
        </motion.div>
        
        {/* Model selection buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModel('bitcoin')}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              activeModel === 'bitcoin' 
                ? 'bg-amber-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Show Bitcoin Model"
          >
            <FaBitcoin className={`text-lg ${activeModel === 'bitcoin' ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModel('ethereum')}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              activeModel === 'ethereum' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Show Ethereum Model"
          >
            <FaEthereum className={`text-lg ${activeModel === 'ethereum' ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModel('solana')}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              activeModel === 'solana' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Show Solana Model"
          >
            <SiSolana className={`text-lg ${activeModel === 'solana' ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}