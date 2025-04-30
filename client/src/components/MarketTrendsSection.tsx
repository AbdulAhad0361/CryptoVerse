import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaBitcoin, FaEthereum } from 'react-icons/fa';
import styles from '@/styles/MarketTrendsSection.module.css';

// Type definitions for crypto data
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  icon: JSX.Element;
  price: string;
  change24h: number;
  change7d: number;
  marketCap: string;
  volume: string;
  chartPath: string;
  chartColor: string;
  bgClass: string;
}

export default function MarketTrendsSection() {
  const [activeTab, setActiveTab] = useState('gainers');
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);

  // Sample data - In a real app, this would come from an API
  useEffect(() => {
    // Sample data with different price changes to test the filters
    const data: CryptoData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: <FaBitcoin className="text-amber-500" />,
        price: '$38,462.23',
        change24h: 2.4,
        change7d: 15.3,
        marketCap: '$725.31B',
        volume: '$28.31B',
        chartPath: 'M0,15 C10,10 20,20 30,15 C40,10 50,5 60,10 C70,15 80,20 90,15 C95,12 100,10 100,12',
        chartColor: '#10B981',
        bgClass: 'bg-amber-100 dark:bg-amber-900/30'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        icon: <FaEthereum className="text-blue-500" />,
        price: '$2,846.12',
        change24h: 3.8,
        change7d: 9.2,
        marketCap: '$342.52B',
        volume: '$14.67B',
        chartPath: 'M0,20 C10,15 20,25 30,20 C40,15 50,5 60,7 C70,10 80,5 90,7 C95,10 100,5 100,7',
        chartColor: '#10B981',
        bgClass: 'bg-blue-100 dark:bg-blue-900/30'
      },
      {
        id: 'xrp',
        name: 'XRP',
        symbol: 'XRP',
        icon: <span className="font-bold text-gray-600 dark:text-gray-300">XRP</span>,
        price: '$0.723',
        change24h: -0.5,
        change7d: 4.1,
        marketCap: '$34.58B',
        volume: '$1.98B',
        chartPath: 'M0,15 C10,20 20,10 30,15 C40,20 50,25 60,20 C70,15 80,10 90,15 C95,18 100,20 100,18',
        chartColor: '#EF4444',
        bgClass: 'bg-gray-100 dark:bg-gray-700'
      },
      {
        id: 'bnb',
        name: 'Binance Coin',
        symbol: 'BNB',
        icon: <span className="font-bold text-green-600 dark:text-green-400">BNB</span>,
        price: '$392.47',
        change24h: 2.1,
        change7d: 7.8,
        marketCap: '$63.21B',
        volume: '$1.52B',
        chartPath: 'M0,10 C10,15 20,5 30,10 C40,15 50,20 60,15 C70,10 80,15 90,5 C95,2 100,5 100,3',
        chartColor: '#10B981',
        bgClass: 'bg-green-100 dark:bg-green-900/30'
      },
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        icon: <span className="font-bold text-purple-600 dark:text-purple-400">SOL</span>,
        price: '$124.31',
        change24h: 5.7,
        change7d: 24.3,
        marketCap: '$51.38B',
        volume: '$2.92B',
        chartPath: 'M0,25 C10,20 20,15 30,10 C40,5 50,15 60,10 C70,5 80,7 90,3 C95,2 100,5 100,3',
        chartColor: '#10B981',
        bgClass: 'bg-purple-100 dark:bg-purple-900/30'
      },
      {
        id: 'doge',
        name: 'Dogecoin',
        symbol: 'DOGE',
        icon: <span className="font-bold text-yellow-600 dark:text-yellow-400">DOGE</span>,
        price: '$0.082',
        change24h: -2.1,
        change7d: -5.8,
        marketCap: '$11.21B',
        volume: '$0.82B',
        chartPath: 'M0,15 C10,20 20,25 30,22 C40,18 50,25 60,22 C70,18 80,22 90,18 C95,16 100,18 100,15',
        chartColor: '#EF4444',
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/30'
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        icon: <span className="font-bold text-blue-600 dark:text-blue-400">ADA</span>,
        price: '$0.987',
        change24h: -1.2,
        change7d: -3.6,
        marketCap: '$33.84B',
        volume: '$1.23B',
        chartPath: 'M0,15 C10,18 20,15 30,18 C40,20 50,15 60,18 C70,20 80,18 90,20 C95,21 100,18 100,20',
        chartColor: '#EF4444',
        bgClass: 'bg-blue-100 dark:bg-blue-900/30'
      }
    ];

    setCryptoData(data);
    filterData(data, activeTab);
  }, []);

  // Update filtered data when active tab changes
  useEffect(() => {
    filterData(cryptoData, activeTab);
  }, [activeTab, cryptoData]);

  // Filter data based on the active tab
  const filterData = (data: CryptoData[], tab: string) => {
    let filtered: CryptoData[];
    
    switch(tab) {
      case 'gainers':
        filtered = [...data].sort((a, b) => b.change24h - a.change24h).filter(coin => coin.change24h > 0);
        break;
      case 'losers':
        filtered = [...data].sort((a, b) => a.change24h - b.change24h).filter(coin => coin.change24h < 0);
        break;
      case 'volume':
        // Sort by volume (normalizing the string to a comparable number)
        filtered = [...data].sort((a, b) => {
          const volumeA = parseFloat(a.volume.replace(/[^0-9.-]+/g, ""));
          const volumeB = parseFloat(b.volume.replace(/[^0-9.-]+/g, ""));
          return volumeB - volumeA;
        });
        break;
      default:
        filtered = data;
    }
    
    // Limit to 5 items for display
    setFilteredData(filtered.slice(0, 5));
  };

  return (
    <section className="fade-in mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Market Trends</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              activeTab === 'gainers' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('gainers')}
          >
            Gainers
          </button>
          <button 
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              activeTab === 'losers' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('losers')}
          >
            Losers
          </button>
          <button 
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              activeTab === 'volume' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('volume')}
          >
            Volume
          </button>
        </div>
      </div>
      
      <motion.div 
        className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl crypto-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop Table - Hidden on small screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">24h %</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">7d %</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Market Cap</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Volume (24h)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last 7 Days</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((crypto, index) => (
                <tr key={crypto.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${crypto.bgClass} p-2 flex items-center justify-center`}>
                        {crypto.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{crypto.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{crypto.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      crypto.change24h >= 0 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      crypto.change7d >= 0 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{crypto.marketCap}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{crypto.volume}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="h-10 w-24 ml-auto">
                      <svg className="w-full h-full" viewBox="0 0 100 30">
                        <path d={crypto.chartPath} fill="none" stroke={crypto.chartColor} strokeWidth="2"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No data available for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View - Visible on small screens */}
        <div className="md:hidden px-4 py-4 space-y-4">
          {filteredData.map((crypto) => (
            <div key={crypto.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${crypto.bgClass} p-1.5 flex items-center justify-center mr-2`}>
                    {crypto.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{crypto.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{crypto.symbol}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{crypto.price}</div>
                  <div className={`text-xs font-medium ${
                    crypto.change24h >= 0 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <div>Market Cap: <span className="text-gray-900 dark:text-white">{crypto.marketCap}</span></div>
                <div>Volume: <span className="text-gray-900 dark:text-white">{crypto.volume}</span></div>
              </div>
            </div>
          ))}
          
          {filteredData.length === 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
              No data available for the selected filter.
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}