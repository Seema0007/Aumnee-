import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';

interface TimelineEvent {
  date: string;
  type: 'leave' | 'milestone' | 'issue';
  title: string;
  description: string;
  developer?: string;
  color: string;
}

export const SprintTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const events: TimelineEvent[] = [
    {
      date: '2024-05-07',
      type: 'milestone',
      title: 'Sprint Start',
      description: 'Sprint 24.12 begins with full team capacity',
      color: 'bg-blue-500'
    },
    {
      date: '2024-05-08',
      type: 'leave',
      title: 'Sumit Leave Starts',
      description: 'Extended leave period begins',
      developer: 'Sumit Wadhwa',
      color: 'bg-amber-500'
    },
    {
      date: '2024-05-10',
      type: 'leave',
      title: 'Multiple Leaves',
      description: 'Yash and Naman on leave',
      developer: 'Yash Moda, Naman',
      color: 'bg-red-500'
    },
    {
      date: '2024-05-20',
      type: 'issue',
      title: 'Bug Spike',
      description: 'Increased production issues reported',
      color: 'bg-orange-500'
    },
    {
      date: '2024-06-05',
      type: 'leave',
      title: 'Anushri Leave',
      description: 'Short leave period',
      developer: 'Anushri Laddha',
      color: 'bg-amber-500'
    },
    {
      date: '2024-06-10',
      type: 'milestone',
      title: 'Sprint End',
      description: 'Sprint 24.12 completion',
      color: 'bg-green-500'
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Sprint Timeline</h3>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-4 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
              whileHover={{ x: 4 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <motion.div
                className={`w-8 h-8 rounded-full ${event.color} flex items-center justify-center z-10 shadow-lg`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {event.type === 'leave' && <Users className="w-4 h-4 text-white" />}
                {event.type === 'milestone' && <Calendar className="w-4 h-4 text-white" />}
                {event.type === 'issue' && <AlertCircle className="w-4 h-4 text-white" />}
              </motion.div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                {event.developer && (
                  <p className="text-xs text-gray-500 mt-1">👤 {event.developer}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${selectedEvent.color} flex items-center justify-center`}>
                  {selectedEvent.type === 'leave' && <Users className="w-5 h-5 text-white" />}
                  {selectedEvent.type === 'milestone' && <Calendar className="w-5 h-5 text-white" />}
                  {selectedEvent.type === 'issue' && <AlertCircle className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedEvent.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedEvent.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              {selectedEvent.developer && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <strong>Affected Developer(s):</strong> {selectedEvent.developer}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};