import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiSolana, SiXrp, SiCardano, SiBinance, SiDogecoin, SiChainlink } from 'react-icons/si';

// Sample notifications 
const notificationData = [
  {
    id: 1,
    icon: <FaBitcoin className="text-amber-500" />,
    title: 'Bitcoin (BTC)',
    message: 'Bitcoin price up 2.4% in the last hour',
    time: '2 min ago',
    type: 'price-up'
  },
  {
    id: 2,
    icon: <FaEthereum className="text-blue-500" />,
    title: 'Ethereum (ETH)',
    message: 'Ethereum gas fees reach 30-day low',
    time: '5 min ago',
    type: 'info'
  },
  {
    id: 3,
    icon: <SiSolana className="text-purple-500" />,
    title: 'Solana (SOL)',
    message: 'SOL down 1.8% following market trend',
    time: '12 min ago',
    type: 'price-down'
  },
  {
    id: 4,
    icon: <SiCardano className="text-blue-700" />,
    title: 'Cardano (ADA)',
    message: 'New protocol upgrade announcement',
    time: '18 min ago',
    type: 'news'
  },
  {
    id: 5,
    icon: <SiBinance className="text-yellow-500" />,
    title: 'Binance Coin (BNB)',
    message: 'BNB trading volume increases by 15%',
    time: '25 min ago',
    type: 'price-up'
  },
  {
    id: 6,
    icon: <SiXrp className="text-blue-600" />,
    title: 'Ripple (XRP)',
    message: 'XRP lawsuit update: SEC schedules new hearing',
    time: '32 min ago',
    type: 'news'
  },
  {
    id: 7,
    icon: <SiDogecoin className="text-yellow-600" />,
    title: 'Dogecoin (DOGE)',
    message: 'DOGE spikes after celebrity tweet',
    time: '40 min ago',
    type: 'price-up'
  },
  {
    id: 8,
    icon: <SiChainlink className="text-blue-500" />,
    title: 'Chainlink (LINK)',
    message: 'LINK oracle services expand to new chains',
    time: '45 min ago',
    type: 'info'
  }
];

export default function LiveNotifications() {
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentNotification = notificationData[currentNotificationIndex];

  // Initialize notification rotation
  useEffect(() => {
    const rotateNotifications = () => {
      setShowNotification(false);
      
      setTimeout(() => {
        setCurrentNotificationIndex((prev) => 
          prev === notificationData.length - 1 ? 0 : prev + 1
        );
        setShowNotification(true);
      }, 500); // Delay to allow exit animation to complete
    };

    // Set up the timer to rotate notifications
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        rotateNotifications();
      }
    }, 5000);

    // Clean up the timer
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  // Get the appropriate background color based on notification type
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'price-up':
        return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'price-down':
        return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'news':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'info':
      default:
        return 'bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700';
    }
  };

  // Get icon color based on notification type
  const getIconClass = (type: string) => {
    switch (type) {
      case 'price-up':
        return 'bg-green-200 dark:bg-green-800 text-green-600 dark:text-green-400';
      case 'price-down':
        return 'bg-red-200 dark:bg-red-800 text-red-600 dark:text-red-400';
      case 'news':
        return 'bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-400';
      case 'info':
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div 
      className="fixed right-0 top-24 z-10 max-w-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        {showNotification && (
          <motion.div
            key={currentNotificationIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center p-3 mr-4 rounded-lg shadow-lg border ${getBackgroundColor(currentNotification.type)}`}
          >
            <div className={`p-2 rounded-full mr-3 ${getIconClass(currentNotification.type)}`}>
              {currentNotification.icon}
            </div>
            <div className="flex-1 mr-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {currentNotification.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {currentNotification.message}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentNotification.time}
              </span>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowNotification(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}