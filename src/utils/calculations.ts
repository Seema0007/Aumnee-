import { Developer, VelocityMetrics } from '../types';

export const calculateAvailableDays = (
  sprintStart: string,
  sprintEnd: string,
  leaveStart?: string,
  leaveEnd?: string
): number => {
  const sprintStartDate = new Date(sprintStart);
  const sprintEndDate = new Date(sprintEnd);
  
  if (!leaveStart || !leaveEnd) {
    return 10; // Full sprint capacity
  }
  
  const leaveStartDate = new Date(leaveStart);
  const leaveEndDate = new Date(leaveEnd);
  
  // Calculate overlap between sprint and leave periods
  const overlapStart = new Date(Math.max(sprintStartDate.getTime(), leaveStartDate.getTime()));
  const overlapEnd = new Date(Math.min(sprintEndDate.getTime(), leaveEndDate.getTime()));
  
  if (overlapStart >= overlapEnd) {
    return 10; // No overlap
  }
  
  // Calculate working days lost (assuming 5 working days per week)
  const msPerDay = 24 * 60 * 60 * 1000;
  const overlapDays = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / msPerDay);
  const workingDaysLost = Math.min(overlapDays * (5/7), 10);
  
  return Math.max(10 - workingDaysLost, 0);
};

export const calculateEffectiveCapacity = (
  availableDays: number,
  bugBufferPercentage: number = 0.2
): number => {
  const totalCapacity = availableDays * 4; // 4 story points per day
  return Math.floor(totalCapacity * (1 - bugBufferPercentage));
};

export const calculateVelocityMetrics = (developers: Developer[]): VelocityMetrics => {
  const totalPlanned = developers.reduce((sum, dev) => sum + dev.assignedStoryPoints, 0);
  const totalCompleted = developers.reduce((sum, dev) => sum + dev.completedStoryPoints, 0);
  const totalBugPoints = developers.reduce((sum, dev) => sum + dev.bugPoints, 0);
  const totalCapacity = developers.reduce((sum, dev) => sum + dev.totalCapacity, 0);
  
  return {
    plannedVelocity: totalPlanned,
    actualVelocity: totalCompleted,
    effectiveVelocity: totalCompleted - totalBugPoints,
    utilizationRate: (totalCompleted / totalCapacity) * 100,
    bugImpact: (totalBugPoints / totalCompleted) * 100
  };
};

export const getCapacityStatus = (utilization: number): 'low' | 'optimal' | 'high' | 'overloaded' => {
  if (utilization < 60) return 'low';
  if (utilization <= 80) return 'optimal';
  if (utilization <= 95) return 'high';
  return 'overloaded';
};