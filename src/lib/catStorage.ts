import { Cat } from '@/types/cat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CATS_KEY = 'catalog:cats';

export async function getCats(): Promise<Cat[]> {
  const json = await AsyncStorage.getItem(CATS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveCats(cats: Cat[]): Promise<void> {
  await AsyncStorage.setItem(CATS_KEY, JSON.stringify(cats));
}

export async function addCat(cat: Cat): Promise<void> {
  const current = await getCats();
  await saveCats([...current, cat]);
}