export interface Cat {
  id: string;
  name: string;
  personality: string;
  breed: string;
  status: 'outdoor' | 'indoor';
  timesSpotted: number;
  location: string;
  notes: string;
  color: string;
  photoUri?: string;
  collections: string[];
  favourite?: boolean;
}