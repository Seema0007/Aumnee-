import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, AlertTriangle, ChevronDown, ChevronUp, Activity, Clock } from 'lucide-react';
import { Developer } from '../types';
import { getCapacityStatus } from '../utils/calculations';

interface InteractiveDeveloperCardProps {
  developer: Developer;
  index: number;
}

export const InteractiveDeveloperCard: React.FC<InteractiveDeveloperCardProps> = ({ 
  developer, 
  index 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const utilization = (developer.completedStoryPoints / developer.totalCapacity) * 100;
  const status = getCapacityStatus(utilization);
  
  const statusColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    optimal: 'bg-green-100 text-green-800 border-green-200',
    high: 'bg-amber-100 text-amber-800 border-amber-200',
    overloaded: 'bg-red-100 text-red-800 border-red-200'
  };

  const progressColors = {
    low: 'bg-gradient-to-r from-blue-400 to-blue-600',
    optimal: 'bg-gradient-to-r from-green-400 to-green-600',
    high: 'bg-gradient-to-r from-amber-400 to-amber-600',
    overloaded: 'bg-gradient-to-r from-red-400 to-red-600'
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <User className="w-6 h-6 text-gray-600" />
            </motion.div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{developer.name}</h3>
              <p className="text-sm text-gray-500">
                {developer.completedStoryPoints}/{developer.availableCapacity} SP
              </p>
            </div>
          </div>
          
          <motion.span 
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.span>
        </div>

        {/* Animated Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">Progress</span>
            <motion.span 
              className="font-bold"
              animate={{ scale: isHovered ? 1.1 : 1 }}
            >
              {Math.round(utilization)}%
            </motion.span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-3 rounded-full ${progressColors[status]}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(utilization, 100)}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </div>

        {/* Leave Information */}
        <AnimatePresence>
          {developer.leaveStart && developer.leaveEnd && (
            <motion.div 
              className="flex items-center space-x-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-xl mb-4 border border-amber-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-medium">
                Leave: {new Date(developer.leaveStart).toLocaleDateString()} - {new Date(developer.leaveEnd).toLocaleDateString()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bug Impact */}
        <AnimatePresence>
          {developer.bugPoints > 0 && (
            <motion.div 
              className="flex items-center space-x-2 text-sm text-red-700 bg-red-50 p-3 rounded-xl mb-4 border border-red-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">{developer.bugPoints} SP on bugs/unplanned work</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <motion.div 
            className="text-center p-3 bg-gray-50 rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Available</p>
            <p className="font-bold text-blue-600">{developer.availableCapacity} SP</p>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-gray-50 rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Assigned</p>
            <p className="font-bold text-purple-600">{developer.assignedStoryPoints} SP</p>
          </motion.div>
        </div>

        {/* Expand/Collapse Button */}
        <motion.button
          className="w-full flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Less Details' : 'More Details'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.button>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Total Capacity</p>
                  <p className="font-semibold">{developer.totalCapacity} SP</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Efficiency</p>
                  <p className="font-semibold">
                    {Math.round((developer.completedStoryPoints / developer.assignedStoryPoints) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Bug Impact</p>
                  <p className="font-semibold text-red-600">
                    {Math.round((developer.bugPoints / developer.completedStoryPoints) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Velocity</p>
                  <p className="font-semibold text-green-600">
                    {developer.completedStoryPoints - developer.bugPoints} SP
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};