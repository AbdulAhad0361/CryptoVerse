import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartPie, FaChartLine, FaBitcoin, FaCoins, FaArrowUp, FaArrowDown, FaSyncAlt } from 'react-icons/fa';
import styles from '@/styles/MarketOverview.module.css';

export default function MarketOverview() {
  const [timeframe, setTimeframe] = useState('24h');

  return (
    <section className="fade-in mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Market Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track the latest cryptocurrency market trends and performance</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="relative inline-block text-sm">
            <select 
              className="block w-full pl-3 pr-10 py-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary appearance-none" 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
              <option value="1y">1y</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <FaSyncAlt className="mr-2" /> Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Market Stat Card 1 */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:shadow-md flex flex-col justify-between crypto-glow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Market Cap</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">$1.98T</h3>
              <p className="flex items-center text-emerald-500 text-sm font-medium mt-1">
                <FaArrowUp className="mr-1" /> 
                <span>2.4%</span>
              </p>
            </div>
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400">
              <FaChartPie className="text-xl" />
            </div>
          </div>
          <div className="mt-4 chart-container">
            <svg className="w-full h-full" viewBox="0 0 400 180">
              <path className="chart-line" stroke="hsl(var(--primary))" d="M0,150 C50,120 100,160 150,110 C200,60 250,80 300,40 C350,20 400,40 400,70" />
            </svg>
          </div>
        </motion.div>
        
        {/* Market Stat Card 2 */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:shadow-md flex flex-col justify-between crypto-glow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">24h Volume</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">$98.7B</h3>
              <p className="flex items-center text-emerald-500 text-sm font-medium mt-1">
                <FaArrowUp className="mr-1" /> 
                <span>5.8%</span>
              </p>
            </div>
            <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400">
              <FaChartLine className="text-xl" />
            </div>
          </div>
          <div className="mt-4 chart-container">
            <svg className="w-full h-full" viewBox="0 0 400 180">
              <path className="chart-line" stroke="hsl(var(--secondary))" d="M0,120 C50,140 100,100 150,130 C200,150 250,90 300,70 C350,60 400,20 400,50" />
            </svg>
          </div>
        </motion.div>
        
        {/* Market Stat Card 3 */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:shadow-md flex flex-col justify-between crypto-glow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">BTC Dominance</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">42.3%</h3>
              <p className="flex items-center text-red-500 text-sm font-medium mt-1">
                <FaArrowDown className="mr-1" /> 
                <span>0.7%</span>
              </p>
            </div>
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400">
              <FaBitcoin className="text-xl" />
            </div>
          </div>
          <div className="mt-4 chart-container">
            <svg className="w-full h-full" viewBox="0 0 400 180">
              <path className="chart-line" stroke="#F59E0B" d="M0,70 C50,60 100,80 150,70 C200,60 250,90 300,110 C350,130 400,120 400,140" />
            </svg>
          </div>
        </motion.div>
        
        {/* Market Stat Card 4 */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:shadow-md flex flex-col justify-between crypto-glow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Currencies</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">12,871</h3>
              <p className="flex items-center text-emerald-500 text-sm font-medium mt-1">
                <FaArrowUp className="mr-1" /> 
                <span>132 new</span>
              </p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400">
              <FaCoins className="text-xl" />
            </div>
          </div>
          <div className="mt-4 chart-container">
            <svg className="w-full h-full" viewBox="0 0 400 180">
              <path className="chart-line" stroke="#10B981" d="M0,160 C50,150 100,140 150,100 C200,90 250,60 300,40 C350,30 400,70 400,60" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
