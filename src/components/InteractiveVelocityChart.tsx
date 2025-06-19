import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface InteractiveVelocityChartProps {
  plannedVelocity: number;
  actualVelocity: number;
  effectiveVelocity: number;
}

export const InteractiveVelocityChart: React.FC<InteractiveVelocityChartProps> = ({
  plannedVelocity,
  actualVelocity,
  effectiveVelocity
}) => {
  const [activeBar, setActiveBar] = useState<string | null>(null);

  const data = [
    {
      name: 'Planned',
      value: plannedVelocity,
      color: '#3B82F6',
      icon: Target,
      description: 'Initial sprint commitment'
    },
    {
      name: 'Actual',
      value: actualVelocity,
      color: '#10B981',
      icon: TrendingUp,
      description: 'Total story points completed'
    },
    {
      name: 'Effective',
      value: effectiveVelocity,
      color: '#F59E0B',
      icon: Zap,
      description: 'Productive velocity after bug impact'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <data.icon className="w-5 h-5" style={{ color: data.color }} />
            <p className="font-semibold text-gray-900">{label} Velocity</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: data.color }}>
            {data.value} SP
          </p>
          <p className="text-sm text-gray-600 mt-1">{data.description}</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ rotate: activeBar ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900">Velocity Analysis</h3>
      </div>

      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              onMouseEnter={(data) => setActiveBar(data.name)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: activeBar === entry.name ? 'brightness(1.1)' : 'brightness(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Legend */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              activeBar === item.name 
                ? 'border-gray-300 shadow-md' 
                : 'border-gray-100 hover:border-gray-200'
            }`}
            onMouseEnter={() => setActiveBar(item.name)}
            onMouseLeave={() => setActiveBar(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
              <span className="text-sm font-semibold text-gray-700">{item.name}</span>
            </div>
            <p className="text-lg font-bold" style={{ color: item.color }}>
              {item.value} SP
            </p>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-700 font-medium mb-1">
          <strong>Velocity Impact:</strong> {actualVelocity - effectiveVelocity} SP lost to bugs/unplanned work
        </p>
        <p className="text-xs text-gray-600">
          Effective velocity represents productive story point delivery after accounting for maintenance work.
        </p>
      </motion.div>
    </motion.div>
  );
};