import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaChevronRight, FaBitcoin, FaEthereum } from 'react-icons/fa';
import styles from '@/styles/TopCryptoSection.module.css';
import { cryptoData } from '@/lib/cryptoData';

export default function TopCryptoSection() {
  return (
    <section className="mb-12 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Top Cryptocurrencies</h2>
        <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium flex items-center">
          View All
          <FaChevronRight className="ml-1 text-xs" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cryptoData.map((crypto, index) => (
          <motion.div 
            key={crypto.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 coin-card dark:shadow-md crypto-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-full p-2 flex items-center justify-center mr-3 ${crypto.iconBg}`}>
                {crypto.id === 'bitcoin' ? (
                  <FaBitcoin className={crypto.iconColor} />
                ) : crypto.id === 'ethereum' ? (
                  <FaEthereum className={crypto.iconColor} />
                ) : (
                  <span className={`font-bold ${crypto.iconColor}`}>{crypto.symbol}</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{crypto.name}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</span>
              </div>
              <div className="ml-auto">
                <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">Rank #{crypto.rank}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{crypto.price}</span>
                <span className={`text-sm font-medium flex items-center ${crypto.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {crypto.change >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  {Math.abs(crypto.change)}%
                </span>
              </div>
              <div className="mt-4 chart-container h-20">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <path className="chart-line" stroke={crypto.chartColor} d={crypto.chartPath} />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Volume (24h)</p>
                <p className="font-medium text-gray-900 dark:text-white">{crypto.volume}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
                <p className="font-medium text-gray-900 dark:text-white">{crypto.marketCap}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
