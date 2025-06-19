import React from 'react';
import { Lightbulb, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { VelocityMetrics, Developer } from '../types';

interface RecommendationsPanelProps {
  metrics: VelocityMetrics;
  developers: Developer[];
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  metrics,
  developers
}) => {
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Analyze velocity variance
    const velocityGap = metrics.plannedVelocity - metrics.actualVelocity;
    if (velocityGap > 10) {
      recommendations.push({
        type: 'warning',
        title: 'Velocity Gap Detected',
        description: `${velocityGap} SP gap between planned and actual velocity. Consider reducing story point estimation or improving sprint planning.`,
        priority: 'high'
      });
    }

    // Analyze bug impact
    if (metrics.bugImpact > 25) {
      recommendations.push({
        type: 'alert',
        title: 'High Bug Impact',
        description: `${Math.round(metrics.bugImpact)}% of effort spent on bugs. Focus on quality improvements and preventive measures.`,
        priority: 'high'
      });
    }

    // Analyze team utilization
    const underutilizedDevs = developers.filter(dev => 
      (dev.completedStoryPoints / dev.totalCapacity) * 100 < 60
    );
    
    if (underutilizedDevs.length > 0) {
      recommendations.push({
        type: 'info',
        title: 'Capacity Optimization',
        description: `${underutilizedDevs.length} developer(s) under 60% utilization. Consider redistributing work or addressing blockers.`,
        priority: 'medium'
      });
    }

    // Leave impact analysis
    const leaveImpactedDevs = developers.filter(dev => 
      dev.leaveStart && dev.leaveEnd && 
      (dev.totalCapacity - dev.availableCapacity) > 8
    );

    if (leaveImpactedDevs.length > 0) {
      recommendations.push({
        type: 'info',
        title: 'Leave Planning',
        description: `${leaveImpactedDevs.length} developer(s) had significant leave impact. Plan backup resources for future sprints.`,
        priority: 'medium'
      });
    }

    // Positive feedback
    if (metrics.utilizationRate >= 75 && metrics.utilizationRate <= 85) {
      recommendations.push({
        type: 'success',
        title: 'Optimal Utilization',
        description: 'Team utilization is in the optimal range (75-85%). Great sprint planning!',
        priority: 'low'
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-amber-500';
      case 'alert':
        return 'border-l-red-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold">Sprint Insights & Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`border-l-4 pl-4 py-3 ${getBorderColor(rec.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(rec.type)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600">{rec.description}</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Future Sprint Planning Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Plan for 20% capacity buffer for production issues</li>
          <li>• Consider leave calendar when assigning critical work</li>
          <li>• Monitor velocity trends over 3-4 sprints for better estimation</li>
          <li>• Ensure balanced workload distribution across team members</li>
        </ul>
      </div>
    </div>
  );
};