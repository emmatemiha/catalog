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




// Possible quest ideas:
// - find a black cat
// - find a black & white cat
// - find a tabby cat
// - find a grey cat
// - find a cat eating grass
// - find a cat loafing
// - find a cat in a window
// - find a cat cleaning itself
// - find a cat sleeping
// - find 2 cats next to each other
// - get a selfie with a cat
// - find a massive fatty cat
// - find a kitten