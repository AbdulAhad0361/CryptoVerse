import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartPie, FaChartLine, FaBitcoin, FaCoins, FaArrowUp, FaArrowDown, FaSyncAlt } from 'react-icons/fa';
import styles from '@/styles/MarketOverview.module.css';

// Define interfaces for market data
interface MarketStat {
  name: string;
  value: string;
  change: number;
  changeLabel?: string;
  chartPath: string;
  icon: JSX.Element;
  bgColorClass: string;
  chartColor: string;
}

export default function MarketOverview() {
  const [timeframe, setTimeframe] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [marketStats, setMarketStats] = useState<MarketStat[]>([]);
  
  // Define the initial market data
  useEffect(() => {
    updateMarketData(timeframe);
  }, []);
  
  // Update market data when timeframe changes
  useEffect(() => {
    updateMarketData(timeframe);
  }, [timeframe]);
  
  // Function to update market data based on timeframe
  const updateMarketData = (selectedTimeframe: string) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // Simulating different data for each timeframe
    setTimeout(() => {
      let data: MarketStat[] = [];
      
      switch(selectedTimeframe) {
        case '24h':
          data = [
            {
              name: 'Market Cap',
              value: '$1.98T',
              change: 2.4,
              chartPath: 'M0,150 C50,120 100,160 150,110 C200,60 250,80 300,40 C350,20 400,40 400,70',
              icon: <FaChartPie className="text-xl" />,
              bgColorClass: 'bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400',
              chartColor: 'hsl(var(--primary))'
            },
            {
              name: '24h Volume',
              value: '$98.7B',
              change: 5.8,
              chartPath: 'M0,120 C50,140 100,100 150,130 C200,150 250,90 300,70 C350,60 400,20 400,50',
              icon: <FaChartLine className="text-xl" />,
              bgColorClass: 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400',
              chartColor: 'hsl(var(--secondary))'
            },
            {
              name: 'BTC Dominance',
              value: '42.3%',
              change: -0.7,
              chartPath: 'M0,70 C50,60 100,80 150,70 C200,60 250,90 300,110 C350,130 400,120 400,140',
              icon: <FaBitcoin className="text-xl" />,
              bgColorClass: 'bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400',
              chartColor: '#F59E0B'
            },
            {
              name: 'Active Currencies',
              value: '12,871',
              change: 132,
              changeLabel: 'new',
              chartPath: 'M0,160 C50,150 100,140 150,100 C200,90 250,60 300,40 C350,30 400,70 400,60',
              icon: <FaCoins className="text-xl" />,
              bgColorClass: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400',
              chartColor: '#10B981'
            }
          ];
          break;
        case '7d':
          data = [
            {
              name: 'Market Cap',
              value: '$2.13T',
              change: 8.3,
              chartPath: 'M0,120 C50,100 100,120 150,80 C200,40 250,60 300,30 C350,20 400,30 400,50',
              icon: <FaChartPie className="text-xl" />,
              bgColorClass: 'bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400',
              chartColor: 'hsl(var(--primary))'
            },
            {
              name: '7d Volume',
              value: '$632.5B',
              change: 12.4,
              chartPath: 'M0,140 C50,120 100,80 150,100 C200,120 250,70 300,50 C350,40 400,30 400,40',
              icon: <FaChartLine className="text-xl" />,
              bgColorClass: 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400',
              chartColor: 'hsl(var(--secondary))'
            },
            {
              name: 'BTC Dominance',
              value: '41.8%',
              change: -1.2,
              chartPath: 'M0,60 C50,70 100,90 150,80 C200,70 250,100 300,120 C350,140 400,130 400,150',
              icon: <FaBitcoin className="text-xl" />,
              bgColorClass: 'bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400',
              chartColor: '#F59E0B'
            },
            {
              name: 'Active Currencies',
              value: '12,904',
              change: 189,
              changeLabel: 'new',
              chartPath: 'M0,150 C50,140 100,130 150,90 C200,80 250,50 300,30 C350,20 400,60 400,50',
              icon: <FaCoins className="text-xl" />,
              bgColorClass: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400',
              chartColor: '#10B981'
            }
          ];
          break;
        case '30d':
          data = [
            {
              name: 'Market Cap',
              value: '$2.24T',
              change: 15.7,
              chartPath: 'M0,130 C50,110 100,140 150,100 C200,50 250,70 300,40 C350,30 400,50 400,60',
              icon: <FaChartPie className="text-xl" />,
              bgColorClass: 'bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400',
              chartColor: 'hsl(var(--primary))'
            },
            {
              name: '30d Volume',
              value: '$2.43T',
              change: 23.6,
              chartPath: 'M0,130 C50,120 100,90 150,110 C200,130 250,80 300,60 C350,50 400,40 400,50',
              icon: <FaChartLine className="text-xl" />,
              bgColorClass: 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400',
              chartColor: 'hsl(var(--secondary))'
            },
            {
              name: 'BTC Dominance',
              value: '43.1%',
              change: 0.8,
              chartPath: 'M0,90 C50,80 100,70 150,60 C200,50 250,80 300,100 C350,120 400,110 400,130',
              icon: <FaBitcoin className="text-xl" />,
              bgColorClass: 'bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400',
              chartColor: '#F59E0B'
            },
            {
              name: 'Active Currencies',
              value: '13,058',
              change: 343,
              changeLabel: 'new',
              chartPath: 'M0,140 C50,130 100,120 150,80 C200,70 250,40 300,20 C350,10 400,50 400,40',
              icon: <FaCoins className="text-xl" />,
              bgColorClass: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400',
              chartColor: '#10B981'
            }
          ];
          break;
        case '90d':
          data = [
            {
              name: 'Market Cap',
              value: '$2.37T',
              change: 21.3,
              chartPath: 'M0,140 C50,120 100,150 150,110 C200,60 250,80 300,50 C350,40 400,60 400,70',
              icon: <FaChartPie className="text-xl" />,
              bgColorClass: 'bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400',
              chartColor: 'hsl(var(--primary))'
            },
            {
              name: '90d Volume',
              value: '$7.18T',
              change: 34.2,
              chartPath: 'M0,120 C50,110 100,80 150,100 C200,120 250,70 300,50 C350,40 400,30 400,40',
              icon: <FaChartLine className="text-xl" />,
              bgColorClass: 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400',
              chartColor: 'hsl(var(--secondary))'
            },
            {
              name: 'BTC Dominance',
              value: '42.7%',
              change: 0.4,
              chartPath: 'M0,80 C50,70 100,60 150,50 C200,40 250,70 300,90 C350,110 400,100 400,120',
              icon: <FaBitcoin className="text-xl" />,
              bgColorClass: 'bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400',
              chartColor: '#F59E0B'
            },
            {
              name: 'Active Currencies',
              value: '13,342',
              change: 627,
              changeLabel: 'new',
              chartPath: 'M0,130 C50,120 100,110 150,70 C200,60 250,30 300,10 C350,0 400,40 400,30',
              icon: <FaCoins className="text-xl" />,
              bgColorClass: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400',
              chartColor: '#10B981'
            }
          ];
          break;
        case '1y':
          data = [
            {
              name: 'Market Cap',
              value: '$2.65T',
              change: 47.8,
              chartPath: 'M0,160 C50,140 100,170 150,120 C200,70 250,90 300,60 C350,50 400,70 400,80',
              icon: <FaChartPie className="text-xl" />,
              bgColorClass: 'bg-primary-100 dark:bg-primary-900/50 text-primary dark:text-primary-400',
              chartColor: 'hsl(var(--primary))'
            },
            {
              name: '1y Volume',
              value: '$28.4T',
              change: 68.3,
              chartPath: 'M0,150 C50,140 100,110 150,130 C200,150 250,100 300,80 C350,70 400,60 400,70',
              icon: <FaChartLine className="text-xl" />,
              bgColorClass: 'bg-secondary-100 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400',
              chartColor: 'hsl(var(--secondary))'
            },
            {
              name: 'BTC Dominance',
              value: '41.2%',
              change: -1.8,
              chartPath: 'M0,60 C50,70 100,85 150,75 C200,65 250,95 300,115 C350,135 400,125 400,145',
              icon: <FaBitcoin className="text-xl" />,
              bgColorClass: 'bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400',
              chartColor: '#F59E0B'
            },
            {
              name: 'Active Currencies',
              value: '14,236',
              change: 1521,
              changeLabel: 'new',
              chartPath: 'M0,120 C50,110 100,100 150,60 C200,50 250,20 300,0 C350,-10 400,30 400,20',
              icon: <FaCoins className="text-xl" />,
              bgColorClass: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400',
              chartColor: '#10B981'
            }
          ];
          break;
        default:
          data = [];
      }
      
      setMarketStats(data);
      setIsLoading(false);
    }, 500); // Simulating API delay
  };
  
  // Function to handle refresh button click
  const handleRefresh = () => {
    updateMarketData(timeframe);
  };

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
              className="block w-full pl-3 pr-10 py-2 text-xs sm:text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary appearance-none" 
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
          <button 
            className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-1 sm:mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Loading...
              </>
            ) : (
              <>
                <FaSyncAlt className="mr-1 sm:mr-2" /> Refresh
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Dynamic Market Stats Cards */}
        {marketStats.map((stat, index) => (
          <motion.div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:shadow-md flex flex-col justify-between crypto-glow"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</h3>
                <p className={`flex items-center ${
                  stat.changeLabel || stat.change >= 0 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                } text-sm font-medium mt-1`}>
                  {stat.changeLabel ? (
                    <>
                      <FaArrowUp className="mr-1" /> 
                      <span>{stat.change} {stat.changeLabel}</span>
                    </>
                  ) : (
                    <>
                      {stat.change >= 0 ? (
                        <FaArrowUp className="mr-1" />
                      ) : (
                        <FaArrowDown className="mr-1" />
                      )}
                      <span>{Math.abs(stat.change)}%</span>
                    </>
                  )}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColorClass}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 chart-container">
              <svg className="w-full h-full" viewBox="0 0 400 180">
                <path className="chart-line" stroke={stat.chartColor} d={stat.chartPath} />
              </svg>
            </div>
          </motion.div>
        ))}
        
        {/* Show loading placeholders if data is loading */}
        {isLoading && marketStats.length === 0 && (
          Array(4).fill(0).map((_, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:shadow-md flex flex-col justify-between animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
                <div className="p-2 rounded-lg h-10 w-10 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="mt-4 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
