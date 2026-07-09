import { useCats } from '@/hooks/useCats';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cats, loading } = useCats();
  const cat = cats.find((c) => c.id === id);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!cat) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Cat not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <View style={[styles.photoHeader, { backgroundColor: cat.color }]} />

        <Text style={styles.name}>{cat.name}</Text>
        <Text style={styles.meta}>Spotted {cat.timesSpotted} times · {cat.location}</Text>

        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{cat.breed}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{cat.status}</Text>
          </View>
          <View style={[styles.tag, styles.tagBerry]}>
            <Text style={[styles.tagText, styles.tagTextBerry]}>{cat.personality}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>{cat.notes}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA' },
  scrollContent: { padding: 20, gap: 12 },
  backButton: { marginBottom: 4 },
  backText: { fontSize: 14, color: '#8C7361' },
  photoHeader: { height: 180, borderRadius: 16, marginBottom: 4 },
  name: { fontSize: 20, fontWeight: '600', color: '#3D2B1F' },
  meta: { fontSize: 12, color: '#8C7361', marginBottom: 4 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  tag: { backgroundColor: '#FCE7CF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 11, color: '#95531F' },
  tagBerry: { backgroundColor: '#F3D6E0' },
  tagTextBerry: { color: '#7A2440' },
  sectionLabel: { fontSize: 13, fontWeight: '500', color: '#3D2B1F', marginTop: 8 },
  notesBox: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#F0E1D0' },
  notesText: { fontSize: 13, color: '#5C4A3A', lineHeight: 20 },
  notFound: { padding: 20, color: '#3D2B1F' },
});