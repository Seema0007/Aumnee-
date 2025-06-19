import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  color = 'blue',
  icon
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    red: 'bg-red-50 border-red-200 text-red-900'
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
    <div className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium opacity-80">{title}</h3>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
      
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-sm opacity-70 mt-1">{subtitle}</p>}
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};