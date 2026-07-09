export interface QuestHistoryItem {
  id: string;
  title: string;
  completedLabel: string;
  catId?: string; // the cat that completed the quest!
}

export const todaysQuest = {
  title: 'Find a gray cat',
  description: 'How many can you find?',
  progress: 0,
  target: 1,
};

export const streakDays = 2;

export const weekProgress = [true, true, false, false, false, false, false];

export const questHistory: QuestHistoryItem[] = [
  { id: '1', title: 'Spot a black & white cat', completedLabel: 'Yesterday', catId: '1' },
  { id: '2', title: 'Find a cat loafing', completedLabel: '2 days ago', catId: '2' },
];