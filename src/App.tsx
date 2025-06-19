import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Target, BarChart3, Filter, Download, RefreshCw } from 'lucide-react';
import { InteractiveMetricCard } from './components/InteractiveMetricCard';
import { InteractiveDeveloperCard } from './components/InteractiveDeveloperCard';
import { InteractiveVelocityChart } from './components/InteractiveVelocityChart';
import { RecommendationsPanel } from './components/RecommendationsPanel';
import { SprintTimeline } from './components/SprintTimeline';
import { TeamCapacityGauge } from './components/TeamCapacityGauge';
import { currentSprint } from './data/sprintData';
import { calculateVelocityMetrics } from './utils/calculations';

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'developers' | 'timeline'>('overview');

  const metrics = calculateVelocityMetrics(currentSprint.developers);
  const totalAvailableCapacity = currentSprint.developers.reduce(
    (sum, dev) => sum + dev.availableCapacity, 0
  );
  const totalAssignedWork = currentSprint.developers.reduce(
    (sum, dev) => sum + dev.assignedStoryPoints, 0
  );
  const totalCapacity = currentSprint.developers.reduce(
    (sum, dev) => sum + dev.totalCapacity, 0
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleExport = () => {
    // Simulate export functionality
    const data = {
      sprint: currentSprint.sprintName,
      metrics,
      developers: currentSprint.developers
    };
    console.log('Exporting data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Animated Header */}
      <motion.div 
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Seema's Jira Sprint Dashboard
                </h1>
                <p className="text-sm text-gray-500 font-medium">{currentSprint.sprintName}</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                {['overview', 'developers', 'timeline'].map((view) => (
                  <motion.button
                    key={view}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedView === view
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSelectedView(view as any)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Filter className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </motion.button>
                
                <motion.button
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleExport}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">
                  {new Date(currentSprint.startDate).toLocaleDateString()} - {new Date(currentSprint.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {selectedView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <InteractiveMetricCard
                  title="Team Velocity"
                  value={metrics.actualVelocity}
                  subtitle="Story Points Completed"
                  trend="up"
                  trendValue="12%"
                  color="green"
                  icon={<Target className="w-5 h-5" />}
                  description="Total story points completed by the team during this sprint"
                />
                <InteractiveMetricCard
                  title="Effective Velocity"
                  value={metrics.effectiveVelocity}
                  subtitle="After Bug Impact"
                  trend="down"
                  trendValue="18%"
                  color="amber"
                  icon={<BarChart3 className="w-5 h-5" />}
                  description="Productive velocity after deducting bug fixes and unplanned work"
                />
                <InteractiveMetricCard
                  title="Team Utilization"
                  value={`${Math.round(metrics.utilizationRate)}%`}
                  subtitle={`${totalAssignedWork}/${totalAvailableCapacity} SP Capacity`}
                  trend="neutral"
                  color="blue"
                  icon={<Users className="w-5 h-5" />}
                  description="Percentage of available team capacity that was utilized"
                />
                <InteractiveMetricCard
                  title="Bug Impact"
                  value={`${Math.round(metrics.bugImpact)}%`}
                  subtitle="Of Total Effort"
                  trend="down"
                  trendValue="5%"
                  color="red"
                  icon={<Target className="w-5 h-5" />}
                  description="Percentage of effort spent on bug fixes and unplanned work"
                />
              </div>

              {/* Charts and Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <InteractiveVelocityChart
                  plannedVelocity={metrics.plannedVelocity}
                  actualVelocity={metrics.actualVelocity}
                  effectiveVelocity={metrics.effectiveVelocity}
                />
                <TeamCapacityGauge
                  totalCapacity={totalCapacity}
                  usedCapacity={metrics.actualVelocity}
                  availableCapacity={totalAvailableCapacity}
                />
              </div>

              {/* Recommendations */}
              <RecommendationsPanel metrics={metrics} developers={currentSprint.developers} />
            </motion.div>
          )}

          {selectedView === 'developers' && (
            <motion.div
              key="developers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-2 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Developer Bandwidth Analysis
                </motion.h2>
                <p className="text-gray-600">Individual capacity utilization and performance metrics</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSprint.developers.map((developer, index) => (
                  <InteractiveDeveloperCard 
                    key={developer.id} 
                    developer={developer} 
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {selectedView === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SprintTimeline />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 p-8 mt-8 shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-6 text-gray-900">Sprint Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-blue-600">{currentSprint.developers.length}</p>
              <p className="text-sm text-blue-700 font-medium">Active Developers</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-green-600">{totalAvailableCapacity}</p>
              <p className="text-sm text-green-700 font-medium">Available Capacity (SP)</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-amber-600">
                {currentSprint.developers.filter(dev => dev.leaveStart && dev.leaveEnd).length}
              </p>
              <p className="text-sm text-amber-700 font-medium">Developers on Leave</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((metrics.effectiveVelocity / metrics.plannedVelocity) * 100)}%
              </p>
              <p className="text-sm text-purple-700 font-medium">Sprint Success Rate</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
