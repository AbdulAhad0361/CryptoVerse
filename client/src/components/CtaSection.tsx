import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRocket, FaShieldAlt, FaBook } from 'react-icons/fa';

export default function CtaSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };
  
  const features = [
    {
      icon: <FaRocket className="text-blue-500 dark:text-blue-400" />,
      title: 'Launch Fast',
      description: 'Start trading across multiple cryptocurrencies with just one click'
    },
    {
      icon: <FaShieldAlt className="text-green-500 dark:text-green-400" />,
      title: 'Stay Secure',
      description: 'Enterprise-grade security to protect your assets and data'
    },
    {
      icon: <FaBook className="text-purple-500 dark:text-purple-400" />,
      title: 'Learn More',
      description: 'Access educational resources to boost your crypto knowledge'
    }
  ];
  
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
        <div className="absolute left-1/4 top-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Dive into the World of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Cryptocurrency</span>?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sign up for our newsletter to receive the latest market insights, trading tips, and exclusive updates.
            </p>
          </motion.div>
          
          {/* Newsletter signup form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${
                    isSubmitted
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2 -ml-1" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
        
        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <div className="text-xl">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient divider */}
        <div className="h-1 w-full max-w-5xl mx-auto mt-24 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </div>
    </section>
  );
}