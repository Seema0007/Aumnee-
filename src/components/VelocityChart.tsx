import React from 'react';
import { BarChart3 } from 'lucide-react';

interface VelocityChartProps {
  plannedVelocity: number;
  actualVelocity: number;
  effectiveVelocity: number;
}

export const VelocityChart: React.FC<VelocityChartProps> = ({
  plannedVelocity,
  actualVelocity,
  effectiveVelocity
}) => {
  const maxValue = Math.max(plannedVelocity, actualVelocity, effectiveVelocity);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Velocity Comparison</h3>
      </div>

      <div className="space-y-6">
        {/* Planned Velocity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Planned Velocity</span>
            <span className="text-sm font-bold text-blue-600">{plannedVelocity} SP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(plannedVelocity / maxValue) * 100}%` }}
            />
          </div>
        </div>

        {/* Actual Velocity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Actual Velocity</span>
            <span className="text-sm font-bold text-green-600">{actualVelocity} SP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(actualVelocity / maxValue) * 100}%` }}
            />
          </div>
        </div>

        {/* Effective Velocity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Effective Velocity</span>
            <span className="text-sm font-bold text-amber-600">{effectiveVelocity} SP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-amber-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(effectiveVelocity / maxValue) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Effective Velocity</strong> = Actual Velocity - Bug/Unplanned Work Impact
        </p>
        <p className="text-xs text-gray-500 mt-1">
          This metric shows productive story point delivery after accounting for maintenance work.
        </p>
      </div>
    </div>
  );
};