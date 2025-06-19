import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface InteractiveMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  icon?: React.ReactNode;
  description?: string;
  onClick?: () => void;
}

export const InteractiveMetricCard: React.FC<InteractiveMetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  color = 'blue',
  icon,
  description,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-900 hover:from-blue-100 hover:to-blue-200',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-900 hover:from-green-100 hover:to-green-200',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 text-amber-900 hover:from-amber-100 hover:to-amber-200',
    red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-900 hover:from-red-100 hover:to-red-200',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-900 hover:from-purple-100 hover:to-purple-200'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${colorClasses[color]} ${
        onClick ? 'hover:shadow-xl hover:scale-105' : 'hover:shadow-lg hover:scale-102'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold opacity-80">{title}</h3>
        <div className="flex items-center space-x-2">
          {description && (
            <div className="relative">
              <Info 
                className="w-4 h-4 opacity-60 hover:opacity-100 cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <motion.div
                  className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {description}
                  <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </motion.div>
              )}
            </div>
          )}
          {icon && (
            <motion.div 
              className="opacity-60"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex items-baseline justify-between">
        <div>
          <motion.p 
            className="text-4xl font-bold"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.p>
          {subtitle && <p className="text-sm opacity-70 mt-2">{subtitle}</p>}
        </div>
        
        {trend && trendValue && (
          <motion.div 
            className={`flex items-center space-x-1 ${trendColors[trend]}`}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {getTrendIcon()}
            <span className="text-sm font-semibold">{trendValue}</span>
          </motion.div>
        )}
      </div>

      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 bg-white"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};