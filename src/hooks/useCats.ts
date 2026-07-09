import { getCats } from '@/lib/catStorage';
import { Cat } from '@/types/cat';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await getCats();
    setCats(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return { cats, loading };
}