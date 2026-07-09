import { useCats } from '@/hooks/useCats';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CollectionsScreen() {
  const { cats } = useCats();
  const [activeFilter, setActiveFilter] = useState('All cats');

  const uniqueCollections = Array.from(new Set(cats.flatMap((c) => c.collections)));
  const filters = ['All cats', ...uniqueCollections, 'Favourites'];

  const filteredCats = cats.filter((cat) => {
    if (activeFilter === 'All cats') return true;
    if (activeFilter === 'Favourites') return cat.favourite;
    return cat.collections.includes(activeFilter);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Collections</Text>
            <Text style={styles.subtitle}>{cats.length} cats catalogued</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Ionicons name="paw" size={18} color="#C2694A" />
          </View>
        </View>

        <Text style={styles.sectionLabel}>Filter by collection</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{filter}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionLabel}>
          {activeFilter} · {filteredCats.length} {filteredCats.length === 1 ? 'cat' : 'cats'}
        </Text>

        <View style={styles.grid}>
          {filteredCats.map((cat) => (
            <Pressable
              key={cat.id}
              style={[styles.card, { backgroundColor: cat.color }]}
              onPress={() => router.push({ pathname: '/cat/[id]', params: { id: cat.id } })}
            >
              {cat.favourite && <Ionicons name="star" size={14} color="#F4A261" style={styles.star} />}
              <View style={styles.cardOverlay}>
                <Text style={styles.cardName}>{cat.name}</Text>
                <Text style={styles.cardMeta}>{cat.timesSpotted} sightings</Text>
              </View>
            </Pressable>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA' },
  scrollContent: { padding: 20, gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '500', color: '#3D2B1F' },
  subtitle: { fontSize: 12, color: '#8C7361', marginTop: 2 },
  avatarCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F4E2D3', alignItems: 'center', justifyContent: 'center',
  },
  sectionLabel: { fontSize: 13, fontWeight: '500', color: '#3D2B1F', marginTop: 12, marginBottom: 8 },
  filterRow: { gap: 8, paddingBottom: 2 },
  chip: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E1D0',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7,
  },
  chipActive: { backgroundColor: '#C2694A', borderColor: '#C2694A' },
  chipText: { fontSize: 11, color: '#5C4A3A' },
  chipTextActive: { color: '#FFFFFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '47%', height: 150, borderRadius: 16, overflow: 'hidden', justifyContent: 'flex-end' },
  star: { position: 'absolute', top: 10, right: 10 },
  cardOverlay: { padding: 10 },
  cardName: { fontSize: 13, fontWeight: '500', color: '#FFFFFF' },
  cardMeta: { fontSize: 10, color: '#F0E1D0', marginTop: 1 },
});