export interface Cat {
  id: string;
  name: string;
  personality: string;
  breed: string;
  status: 'outdoor' | 'indoor' | 'stray';
  timesSpotted: number;
  location: string;
  notes: string;
  color: string; // temporary placeholder color until real photos exist
  collections: string[];
  favourite?: boolean;
}

export const cats: Cat[] = [
  {
    id: '1',
    name: 'Nico',
    personality: 'shy',
    breed: 'black & white',
    status: 'outdoor',
    timesSpotted: 4,
    location: 'Elm Street',
    notes: 'Such a sweet, timid boy.',
    color: '#3D2B1F',
    collections: ['Neighbourhood regulars'],
    favourite: true,
  },
  {
    id: '2',
    name: 'Maia',
    personality: 'friendly',
    breed: 'tabby',
    status: 'outdoor',
    timesSpotted: 2,
    location: 'Elm Street park',
    notes: 'Comes right up to you, loves being pet.',
    color: '#DDBFA0',
    collections: ['Neighbourhood regulars'],
  },
];