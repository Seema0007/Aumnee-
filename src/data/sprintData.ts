import { Developer, SprintData, Issue } from '../types';

// Sample data based on the provided Google sheet and requirements
export const developers: Developer[] = [
  {
    id: '1',
    name: 'Aakarsh Mahajan',
    leaveStart: '2024-06-09',
    leaveEnd: '2024-06-15',
    totalCapacity: 40, // 10 working days * 4 story points
    availableCapacity: 32, // Adjusted for leaves
    assignedStoryPoints: 28,
    completedStoryPoints: 24,
    bugPoints: 6
  },
  {
    id: '2',
    name: 'Yash Moda',
    leaveStart: '2024-05-01',
    leaveEnd: '2024-05-10',
    totalCapacity: 40,
    availableCapacity: 20, // Significant leave impact
    assignedStoryPoints: 18,
    completedStoryPoints: 16,
    bugPoints: 4
  },
  {
    id: '3',
    name: 'Naman',
    leaveStart: '2024-05-10',
    leaveEnd: '2024-05-20',
    totalCapacity: 40,
    availableCapacity: 24,
    assignedStoryPoints: 20,
    completedStoryPoints: 18,
    bugPoints: 3
  },
  {
    id: '4',
    name: 'Sumit Wadhwa',
    leaveStart: '2024-05-08',
    leaveEnd: '2024-05-31',
    totalCapacity: 40,
    availableCapacity: 12, // Extended leave
    assignedStoryPoints: 10,
    completedStoryPoints: 10,
    bugPoints: 2
  },
  {
    id: '5',
    name: 'Ayushman Bajpayee',
    leaveStart: '2024-06-12',
    leaveEnd: '2024-06-16',
    totalCapacity: 40,
    availableCapacity: 36,
    assignedStoryPoints: 32,
    completedStoryPoints: 30,
    bugPoints: 7
  },
  {
    id: '6',
    name: 'Anushri Laddha',
    leaveStart: '2024-06-05',
    leaveEnd: '2024-06-10',
    totalCapacity: 40,
    availableCapacity: 32,
    assignedStoryPoints: 28,
    completedStoryPoints: 26,
    bugPoints: 5
  },
  {
    id: '7',
    name: 'Priyanshu Gupta',
    leaveStart: '2024-06-11',
    leaveEnd: '2024-06-15',
    totalCapacity: 40,
    availableCapacity: 32,
    assignedStoryPoints: 30,
    completedStoryPoints: 28,
    bugPoints: 6
  }
];

export const currentSprint: SprintData = {
  sprintName: 'Sprint 24.12',
  startDate: '2024-05-07',
  endDate: '2024-06-10',
  totalWorkingDays: 10,
  developers
};

export const issues: Issue[] = [
  {
    id: 'PROJ-101',
    title: 'User Authentication System',
    type: 'Story',
    storyPoints: 8,
    status: 'Done',
    developer: 'Aakarsh Mahajan',
    techStartDate: '2024-05-07',
    techCloseDate: '2024-05-15'
  },
  {
    id: 'PROJ-102',
    title: 'Payment Gateway Integration',
    type: 'Story',
    storyPoints: 13,
    status: 'In Progress',
    developer: 'Ayushman Bajpayee',
    techStartDate: '2024-05-10'
  },
  {
    id: 'PROJ-103',
    title: 'Dashboard Performance Bug',
    type: 'Bug',
    storyPoints: 5,
    status: 'Done',
    developer: 'Anushri Laddha',
    techStartDate: '2024-05-20',
    techCloseDate: '2024-05-22'
  },
  // Add more issues as needed
];