import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';

interface TeamCapacityGaugeProps {
  totalCapacity: number;
  usedCapacity: number;
  availableCapacity: number;
}

export const TeamCapacityGauge: React.FC<TeamCapacityGaugeProps> = ({
  totalCapacity,
  usedCapacity,
  availableCapacity
}) => {
  const utilizationPercentage = (usedCapacity / totalCapacity) * 100;
  const availablePercentage = (availableCapacity / totalCapacity) * 100;
  
  const getUtilizationColor = () => {
    if (utilizationPercentage < 60) return '#3B82F6'; // Blue
    if (utilizationPercentage < 80) return '#10B981'; // Green
    if (utilizationPercentage < 95) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const getUtilizationStatus = () => {
    if (utilizationPercentage < 60) return 'Under-utilized';
    if (utilizationPercentage < 80) return 'Optimal';
    if (utilizationPercentage < 95) return 'High Load';
    return 'Overloaded';
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Team Capacity</h3>
      </div>

      {/* Circular Progress */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke={getUtilizationColor()}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - utilizationPercentage / 100)}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - utilizationPercentage / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-3xl font-bold text-gray-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {Math.round(utilizationPercentage)}%
          </motion.span>
          <span className="text-sm text-gray-600 mt-1">Utilized</span>
        </div>
      </div>

      {/* Status Indicator */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          {utilizationPercentage > 95 ? (
            <AlertTriangle className="w-5 h-5 text-red-500" />
          ) : (
            <TrendingUp className="w-5 h-5 text-green-500" />
          )}
          <span 
            className="font-semibold"
            style={{ color: getUtilizationColor() }}
          >
            {getUtilizationStatus()}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {usedCapacity} of {totalCapacity} SP capacity used
        </p>
      </motion.div>

      {/* Capacity Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div 
          className="text-center p-3 bg-blue-50 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs text-blue-600 font-medium">Total</p>
          <p className="text-lg font-bold text-blue-700">{totalCapacity}</p>
          <p className="text-xs text-blue-500">SP</p>
        </motion.div>
        
        <motion.div 
          className="text-center p-3 bg-green-50 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs text-green-600 font-medium">Used</p>
          <p className="text-lg font-bold text-green-700">{usedCapacity}</p>
          <p className="text-xs text-green-500">SP</p>
        </motion.div>
        
        <motion.div 
          className="text-center p-3 bg-gray-50 rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs text-gray-600 font-medium">Available</p>
          <p className="text-lg font-bold text-gray-700">{availableCapacity}</p>
          <p className="text-xs text-gray-500">SP</p>
        </motion.div>
      </div>
    </motion.div>
  );
};