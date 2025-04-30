import { useRef, useEffect } from 'react';
import { FaBitcoin, FaEthereum, FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import { SiSolana, SiXrp, SiCardano, SiPolkadot, SiDogecoin, SiBinance, SiChainlink } from 'react-icons/si';

// Sample market data
const marketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$44,273.67', change: 2.45, icon: <FaBitcoin className="text-amber-500" /> },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,180.42', change: -1.23, icon: <FaEthereum className="text-blue-500" /> },
  { name: 'Solana', symbol: 'SOL', price: '$108.35', change: 5.67, icon: <SiSolana className="text-purple-500" /> },
  { name: 'XRP', symbol: 'XRP', price: '$0.5127', change: 0.89, icon: <SiXrp className="text-blue-600" /> },
  { name: 'Cardano', symbol: 'ADA', price: '$0.4573', change: -2.13, icon: <SiCardano className="text-blue-700" /> },
  { name: 'Polkadot', symbol: 'DOT', price: '$6.93', change: 1.52, icon: <SiPolkadot className="text-pink-600" /> },
  { name: 'Dogecoin', symbol: 'DOGE', price: '$0.0876', change: 4.21, icon: <SiDogecoin className="text-yellow-600" /> },
  { name: 'Binance Coin', symbol: 'BNB', price: '$316.85', change: -0.75, icon: <SiBinance className="text-yellow-500" /> },
  { name: 'Chainlink', symbol: 'LINK', price: '$13.47', change: 3.18, icon: <SiChainlink className="text-blue-500" /> },
];

// Global market stats
const globalStats = [
  { name: 'Market Cap', value: '$1.67T', icon: <FaChartLine /> },
  { name: '24h Volume', value: '$87.5B', icon: <FaExchangeAlt /> },
  { name: 'Dominance', value: 'BTC: 47.2%', icon: <FaBitcoin /> },
];

export default function StatisticsBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollElement = scrollRef.current;
    
    if (!scrollElement) return;
    
    // Function to scroll the content
    const scroll = () => {
      if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth) {
        // If we've scrolled to the end, start over
        scrollElement.scrollLeft = 0;
      } else {
        // Otherwise, continue scrolling
        scrollElement.scrollLeft += 1;
      }
    };
    
    // Set an interval to scroll every 30ms for smooth scrolling
    let scrollInterval = setInterval(scroll, 30);
    
    // Pause scrolling when hovering
    const pauseScroll = () => {
      clearInterval(scrollInterval);
    };
    
    const resumeScroll = () => {
      // Clear any existing interval first
      clearInterval(scrollInterval);
      // Create a new interval
      scrollInterval = setInterval(scroll, 30);
    };
    
    scrollElement.addEventListener('mouseenter', pauseScroll);
    scrollElement.addEventListener('mouseleave', resumeScroll);
    
    // Clean up
    return () => {
      clearInterval(scrollInterval);
      if (scrollElement) {
        scrollElement.removeEventListener('mouseenter', pauseScroll);
        scrollElement.removeEventListener('mouseleave', resumeScroll);
      }
    };
  }, []);
  
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 overflow-hidden w-full">
      <div className="flex items-center max-w-full">
        {/* Global stats (fixed) */}
        <div className="flex items-center space-x-6 mr-6 pr-6 border-r border-gray-200 dark:border-gray-700 shrink-0">
          {globalStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">{stat.icon}</span>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.name}:</span>
                <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scrolling market data */}
        <div 
          ref={scrollRef}
          className="flex items-center space-x-8 overflow-x-hidden whitespace-nowrap"
        >
          {/* Duplicate the items to create a smooth infinite scroll */}
          {[...marketData, ...marketData].map((crypto, index) => (
            <div key={index} className="flex items-center space-x-2 shrink-0">
              <span className="text-lg">{crypto.icon}</span>
              <div>
                <div className="flex items-baseline">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{crypto.symbol}</span>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{crypto.price}</span>
                </div>
                <div className={`text-xs font-medium ${
                  crypto.change > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {crypto.change > 0 ? '+' : ''}{crypto.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}