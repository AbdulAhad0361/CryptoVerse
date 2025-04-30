import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoinModel from './CoinModel';
import EthereumModel from './EthereumModel';
import SolanaModel from './SolanaModel';
import RippleModel from './RippleModel';
import CardanoModel from './CardanoModel';
import PolkadotModel from './PolkadotModel';
import ParticleBackground from './ParticleBackground';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiSolana, SiXrp, SiCardano, SiPolkadot } from 'react-icons/si';

type CryptoModel = 'bitcoin' | 'ethereum' | 'solana' | 'ripple' | 'cardano' | 'polkadot';

interface ModelSelectorProps {
  onModelChange?: (modelName: string) => void;
}

export default function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [activeModel, setActiveModel] = useState<CryptoModel>('bitcoin');
  
  // Notify parent component when model changes
  useEffect(() => {
    if (onModelChange) {
      onModelChange(activeModel);
    }
  }, [activeModel, onModelChange]);
  
  // Get the particle color based on the active model
  const getParticleColor = useCallback(() => {
    switch (activeModel) {
      case 'bitcoin':
        return '#F59E0B'; // Amber
      case 'ethereum':
        return '#3B82F6'; // Blue
      case 'solana':
        return '#9945FF'; // Purple
      case 'ripple':
        return '#0081C2'; // Light blue
      case 'cardano':
        return '#0033AD'; // Cardano blue
      case 'polkadot':
        return '#E6007A'; // Polkadot pink
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
      case 'ripple':
        return <RippleModel />;
      case 'cardano':
        return <CardanoModel />;
      case 'polkadot':
        return <PolkadotModel />;
      default:
        return <CoinModel />;
    }
  };
  
  // Helper to get model name and symbol
  const getModelNameAndSymbol = () => {
    switch (activeModel) {
      case 'bitcoin':
        return 'Bitcoin (BTC)';
      case 'ethereum':
        return 'Ethereum (ETH)';
      case 'solana':
        return 'Solana (SOL)';
      case 'ripple':
        return 'Ripple (XRP)';
      case 'cardano':
        return 'Cardano (ADA)';
      case 'polkadot':
        return 'Polkadot (DOT)';
      default:
        return 'Unknown';
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
        
        {/* Static model label container with fixed height */}
        <div className="absolute top-4 left-0 right-0 flex justify-center" style={{ height: '28px' }}>
          <div className="px-3 py-1 rounded-lg bg-white/30 dark:bg-black/30 backdrop-blur-sm text-gray-800 dark:text-white font-semibold text-sm">
            {getModelNameAndSymbol()}
          </div>
        </div>
        
        {/* Model selection buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2">
          {/* First row of buttons */}
          <div className="flex justify-center space-x-2">
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
          
          {/* Second row of buttons */}
          <div className="flex justify-center space-x-2">
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModel('ripple')}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                activeModel === 'ripple' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Show Ripple Model"
            >
              <SiXrp className={`text-lg ${activeModel === 'ripple' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModel('cardano')}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                activeModel === 'cardano' 
                  ? 'bg-blue-700 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Show Cardano Model"
            >
              <SiCardano className={`text-lg ${activeModel === 'cardano' ? 'text-white' : 'text-blue-700 dark:text-blue-500'}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModel('polkadot')}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                activeModel === 'polkadot' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              aria-label="Show Polkadot Model"
            >
              <SiPolkadot className={`text-lg ${activeModel === 'polkadot' ? 'text-white' : 'text-pink-600 dark:text-pink-400'}`} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}