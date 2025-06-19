export interface Developer {
  id: string;
  name: string;
  leaveStart?: string;
  leaveEnd?: string;
  totalCapacity: number;
  availableCapacity: number;
  assignedStoryPoints: number;
  completedStoryPoints: number;
  bugPoints: number;
}

export interface SprintData {
  sprintName: string;
  startDate: string;
  endDate: string;
  totalWorkingDays: number;
  developers: Developer[];
}

export interface VelocityMetrics {
  plannedVelocity: number;
  actualVelocity: number;
  effectiveVelocity: number;
  utilizationRate: number;
  bugImpact: number;
}

export interface Issue {
  id: string;
  title: string;
  type: 'Story' | 'Bug' | 'Task';
  storyPoints: number;
  status: 'To Do' | 'In Progress' | 'Done';
  developer: string;
  techStartDate?: string;
  techCloseDate?: string;
}