import { cats } from '@/types/cat';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Catalog</Text>
            <Text style={styles.subtitle}>{cats.length} cats spotted</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Ionicons name="paw" size={18} color="#C2694A" />
          </View>
        </View>

        <Pressable style={styles.questBanner} onPress={() => router.push('/quests')}>
          <View style={styles.questIconCircle}>
            <MaterialCommunityIcons name="target" size={18} color="#FBEAF0" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.questLabel}>Today's Quest</Text>
            <Text style={styles.questTitle}>Find a gray cat</Text>
          </View>
          <View style={styles.questProgressPill}>
            <Text style={styles.questProgressText}>0/1</Text>
          </View>
        </Pressable>

        <Pressable style={styles.mapPreview} onPress={() => router.push('/map')}>
          <View style={styles.mapPin1} />
          <View style={styles.mapPin2} />
          <View style={styles.mapCaption}>
            <Text style={styles.mapCaptionText}>2 sightings this week</Text>
          </View>
        </Pressable>

        <Text style={styles.sectionLabel}>Recent sightings</Text>

        {cats.map((cat) => (
          <Pressable
            key={cat.id}
            style={styles.catCard}
            onPress={() => router.push({ pathname: '/cat/[id]', params: { id: cat.id } })}
          >
            <View style={[styles.catThumbnail, { backgroundColor: cat.color }]} />
            <View style={styles.catInfo}>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catMeta}>{cat.personality} · {cat.breed}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{cat.status}</Text>
            </View>
          </Pressable>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA' },
  scrollContent: { padding: 20, gap: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '500', color: '#3D2B1F' },
  subtitle: { fontSize: 12, color: '#8C7361', marginTop: 2 },
  avatarCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F4E2D3', alignItems: 'center', justifyContent: 'center',
  },
  questBanner: {
    backgroundColor: '#99284F', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  questIconCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
  },
  questLabel: { fontSize: 12, color: '#F0BFCF', marginBottom: 2 },
  questTitle: { fontSize: 15, fontWeight: '600', color: '#FBEAF0' },
  questProgressPill: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  questProgressText: { fontSize: 11, color: '#FBEAF0' },
  mapPreview: {
    height: 130, borderRadius: 16, backgroundColor: '#F0E1D0',
    overflow: 'hidden', justifyContent: 'flex-end',
  },
  mapPin1: {
    position: 'absolute', top: 40, left: 100,
    width: 14, height: 14, borderRadius: 7, backgroundColor: '#C2694A',
  },
  mapPin2: {
    position: 'absolute', top: 70, left: 220,
    width: 14, height: 14, borderRadius: 7, backgroundColor: '#C97C5D',
  },
  mapCaption: {
    margin: 8, alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  mapCaptionText: { fontSize: 11, color: '#6B4A34' },
  sectionLabel: { fontSize: 13, fontWeight: '500', color: '#3D2B1F', marginTop: 4 },
  catCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 12, gap: 12, borderWidth: 1, borderColor: '#F0E1D0',
  },
  catThumbnail: { width: 48, height: 48, borderRadius: 10 },
  catInfo: { flex: 1 },
  catName: { fontSize: 14, fontWeight: '500', color: '#3D2B1F' },
  catMeta: { fontSize: 12, color: '#8C7361', marginTop: 2 },
  tag: { backgroundColor: '#FCE7CF', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, color: '#95531F' },
});