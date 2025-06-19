import React from 'react';
import { User, Calendar, AlertTriangle } from 'lucide-react';
import { Developer } from '../types';
import { getCapacityStatus } from '../utils/calculations';

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const utilization = (developer.completedStoryPoints / developer.totalCapacity) * 100;
  const status = getCapacityStatus(utilization);
  
  const statusColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    optimal: 'bg-green-100 text-green-800 border-green-200',
    high: 'bg-amber-100 text-amber-800 border-amber-200',
    overloaded: 'bg-red-100 text-red-800 border-red-200'
  };

  const progressColors = {
    low: 'bg-blue-500',
    optimal: 'bg-green-500',
    high: 'bg-amber-500',
    overloaded: 'bg-red-500'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{developer.name}</h3>
            <p className="text-sm text-gray-500">
              {developer.completedStoryPoints}/{developer.availableCapacity} SP
            </p>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(utilization)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${progressColors[status]}`}
            style={{ width: `${Math.min(utilization, 100)}%` }}
          />
        </div>
      </div>

      {/* Leave Information */}
      {developer.leaveStart && developer.leaveEnd && (
        <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg mb-4">
          <Calendar className="w-4 h-4" />
          <span>
            Leave: {new Date(developer.leaveStart).toLocaleDateString()} - {new Date(developer.leaveEnd).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Bug Impact */}
      {developer.bugPoints > 0 && (
        <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertTriangle className="w-4 h-4" />
          <span>{developer.bugPoints} SP on bugs/unplanned work</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-500">Available Capacity</p>
          <p className="font-semibold">{developer.availableCapacity} SP</p>
        </div>
        <div>
          <p className="text-gray-500">Assigned Work</p>
          <p className="font-semibold">{developer.assignedStoryPoints} SP</p>
        </div>
      </div>
    </div>
  );
};