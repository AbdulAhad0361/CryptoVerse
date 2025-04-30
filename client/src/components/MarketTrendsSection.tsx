import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaBitcoin, FaEthereum } from 'react-icons/fa';
import styles from '@/styles/MarketTrendsSection.module.css';

export default function MarketTrendsSection() {
  const [activeTab, setActiveTab] = useState('gainers');

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
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 p-2 flex items-center justify-center">
                      <FaBitcoin className="text-amber-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Bitcoin</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">BTC</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$38,462.23</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +2.4%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +15.3%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$725.31B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$28.31B</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-10 w-24 ml-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,15 C10,10 20,20 30,15 C40,10 50,5 60,10 C70,15 80,20 90,15 C95,12 100,10 100,12" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 flex items-center justify-center">
                      <FaEthereum className="text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Ethereum</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">ETH</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$2,846.12</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +3.8%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +9.2%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$342.52B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$14.67B</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-10 w-24 ml-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,20 C10,15 20,25 30,20 C40,15 50,5 60,7 C70,10 80,5 90,7 C95,10 100,5 100,7" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </td>
              </tr>
              
              {/* Row 3 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">3</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 p-2 flex items-center justify-center">
                      <span className="font-bold text-gray-600 dark:text-gray-300">XRP</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">XRP</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">XRP</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$0.723</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                    -0.5%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +4.1%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$34.58B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$1.98B</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-10 w-24 ml-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,15 C10,20 20,10 30,15 C40,20 50,25 60,20 C70,15 80,10 90,15 C95,18 100,20 100,18" fill="none" stroke="#EF4444" strokeWidth="2"></path>
                    </svg>
                  </div>
                </td>
              </tr>
              
              {/* Row 4 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">4</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 p-2 flex items-center justify-center">
                      <span className="font-bold text-green-600 dark:text-green-400">BNB</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Binance Coin</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">BNB</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$392.47</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +2.1%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +7.8%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$63.21B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$1.52B</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-10 w-24 ml-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,10 C10,15 20,5 30,10 C40,15 50,20 60,15 C70,10 80,15 90,5 C95,2 100,5 100,3" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </td>
              </tr>
              
              {/* Row 5 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">5</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 p-2 flex items-center justify-center">
                      <span className="font-bold text-purple-600 dark:text-purple-400">SOL</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Solana</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">SOL</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$124.31</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +5.7%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    +24.3%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$51.38B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$2.92B</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-10 w-24 ml-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,25 C10,20 20,15 30,10 C40,5 50,15 60,10 C70,5 80,7 90,3 C95,2 100,5 100,3" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on small screens */}
        <div className="md:hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Card 1 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 p-2 flex items-center justify-center mr-3">
                    <FaBitcoin className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Bitcoin (BTC)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rank #1</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">$38,462.23</div>
                  <div className="inline-flex text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1">
                    +2.4%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
                  <div className="font-medium text-gray-900 dark:text-white">$725.31B</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Volume (24h)</div>
                  <div className="font-medium text-gray-900 dark:text-white">$28.31B</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="h-8">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,15 C10,10 20,20 30,15 C40,10 50,5 60,10 C70,15 80,20 90,15 C95,12 100,10 100,12" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 flex items-center justify-center mr-3">
                    <FaEthereum className="text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Ethereum (ETH)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rank #2</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">$2,846.12</div>
                  <div className="inline-flex text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1">
                    +3.8%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
                  <div className="font-medium text-gray-900 dark:text-white">$342.52B</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Volume (24h)</div>
                  <div className="font-medium text-gray-900 dark:text-white">$14.67B</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="h-8">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,20 C10,15 20,25 30,20 C40,15 50,5 60,7 C70,10 80,5 90,7 C95,10 100,5 100,7" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 p-2 flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-600 dark:text-gray-300">XRP</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">XRP (XRP)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rank #3</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">$0.723</div>
                  <div className="inline-flex text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1">
                    -0.5%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
                  <div className="font-medium text-gray-900 dark:text-white">$34.58B</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Volume (24h)</div>
                  <div className="font-medium text-gray-900 dark:text-white">$1.98B</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="h-8">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,15 C10,20 20,10 30,15 C40,20 50,25 60,20 C70,15 80,10 90,15 C95,18 100,20 100,18" fill="none" stroke="#EF4444" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 p-2 flex items-center justify-center mr-3">
                    <span className="font-bold text-green-600 dark:text-green-400">BNB</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Binance Coin (BNB)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rank #4</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">$392.47</div>
                  <div className="inline-flex text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1">
                    +2.1%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
                  <div className="font-medium text-gray-900 dark:text-white">$63.21B</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Volume (24h)</div>
                  <div className="font-medium text-gray-900 dark:text-white">$1.52B</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="h-8">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,10 C10,15 20,5 30,10 C40,15 50,20 60,15 C70,10 80,15 90,5 C95,2 100,5 100,3" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 p-2 flex items-center justify-center mr-3">
                    <span className="font-bold text-purple-600 dark:text-purple-400">SOL</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Solana (SOL)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rank #5</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">$124.31</div>
                  <div className="inline-flex text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1">
                    +5.7%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
                  <div className="font-medium text-gray-900 dark:text-white">$51.38B</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Volume (24h)</div>
                  <div className="font-medium text-gray-900 dark:text-white">$2.92B</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="h-8">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M0,25 C10,20 20,15 30,10 C40,5 50,15 60,10 C70,5 80,7 90,3 C95,2 100,5 100,3" fill="none" stroke="#10B981" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
