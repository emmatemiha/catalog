import { questHistory, streakDays, todaysQuest, weekProgress } from '@/types/quest';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function QuestsScreen() {
  const progressPercent = (todaysQuest.progress / todaysQuest.target) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Quests</Text>
            <Text style={styles.subtitle}>{streakDays} day streak</Text>
          </View>
          <View style={styles.flameCircle}>
            <MaterialCommunityIcons name="fire" size={20} color="#99284F" />
          </View>
        </View>

        <View style={styles.streakRow}>
          {weekProgress.map((done, i) => (
            <View key={i} style={[styles.streakBar, done ? styles.streakBarDone : styles.streakBarEmpty]} />
          ))}
        </View>
        <View style={styles.streakLabels}>
          {dayLabels.map((label, i) => (
            <Text key={i} style={styles.streakLabel}>{label}</Text>
          ))}
        </View>

        <View style={styles.questCard}>
          <Text style={styles.questEyebrow}>TODAY'S QUEST</Text>
          <View style={styles.questRow}>
            <View style={styles.questIconCircle}>
              <MaterialCommunityIcons name="cat" size={24} color="#FBEAF0" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.questTitle}>{todaysQuest.title}</Text>
              <Text style={styles.questDescription}>{todaysQuest.description}</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{todaysQuest.progress} of {todaysQuest.target} found</Text>
        </View>

        <Text style={styles.sectionLabel}>History</Text>

        {questHistory.map((item) => (
          <Pressable
            key={item.id}
            style={styles.historyRow}
            disabled={!item.catId}
            onPress={() => {
              if (item.catId) {
                router.push({ pathname: '/cat/[id]', params: { id: item.catId } });
              }
            }}
          >
            <View style={styles.historyCheckCircle}>
              <MaterialCommunityIcons name="check" size={20} color="#C2694A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyMeta}>{item.completedLabel}</Text>
            </View>
          </Pressable>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA' },
  scrollContent: { padding: 20, gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 20, fontWeight: '500', color: '#3D2B1F' },
  subtitle: { fontSize: 12, color: '#8C7361', marginTop: 2 },
  flameCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F3D6E0', alignItems: 'center', justifyContent: 'center',
  },
  streakRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
  streakBar: { flex: 1, height: 8, borderRadius: 4 },
  streakBarDone: { backgroundColor: '#99284F' },
  streakBarEmpty: { backgroundColor: '#F0E1D0' },
  streakLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  streakLabel: { fontSize: 9, color: '#B8A392', width: 20, textAlign: 'center' },
  questCard: { backgroundColor: '#99284F', borderRadius: 18, padding: 18, marginTop: 8 },
  questEyebrow: { fontSize: 11, color: '#F0BFCF', letterSpacing: 0.5, marginBottom: 10 },
  questRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  questIconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
  },
  questTitle: { fontSize: 16, fontWeight: '600', color: '#FBEAF0' },
  questDescription: { fontSize: 12, color: '#F0BFCF', marginTop: 2 },
  progressTrack: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, height: 8, overflow: 'hidden', marginBottom: 8,
  },
  progressFill: { height: '100%', backgroundColor: '#FBEAF0', borderRadius: 10 },
  progressLabel: { fontSize: 11, color: '#F0BFCF' },
  sectionLabel: { fontSize: 13, fontWeight: '500', color: '#3D2B1F', marginTop: 16, marginBottom: 4 },
  // matches home's catCard sizing exactly
  historyRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: '#F0E1D0', marginBottom: 8,
  },
  historyCheckCircle: {
    width: 48, height: 48, borderRadius: 10,
    backgroundColor: '#FCE7CF', alignItems: 'center', justifyContent: 'center',
  },
  historyTitle: { fontSize: 14, fontWeight: '500', color: '#3D2B1F' },
  historyMeta: { fontSize: 12, color: '#8C7361', marginTop: 2 },
});